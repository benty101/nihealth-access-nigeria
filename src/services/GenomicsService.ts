
export interface GenomicVariant {
  id: string;
  chromosome: string;
  position: number;
  reference: string;
  alternate: string;
  gene?: string;
  variant_type: 'SNV' | 'INDEL' | 'CNV' | 'SV';
  clinical_significance: 'pathogenic' | 'likely_pathogenic' | 'uncertain' | 'likely_benign' | 'benign';
  allele_frequency?: number;
  depth?: number;
  quality_score?: number;
  genotype?: string;
  inheritance_pattern?: 'autosomal_dominant' | 'autosomal_recessive' | 'x_linked' | 'mitochondrial';
  associated_conditions?: string[];
  drug_interactions?: string[];
  recommendations?: string[];
}

export interface GenomicReport {
  id: string;
  patient_id: string;
  report_type: 'vcf' | 'pdf' | 'clinical_report';
  file_url: string;
  file_name: string;
  upload_date: string;
  lab_name?: string;
  test_type: 'whole_genome' | 'exome' | 'targeted_panel' | 'pharmacogenomics' | 'carrier_screening';
  variants: GenomicVariant[];
  summary: {
    total_variants: number;
    pathogenic_variants: number;
    actionable_variants: number;
    risk_score?: number;
  };
  access_permissions: {
    patient: boolean;
    primary_physician: boolean;
    genetic_counselor: boolean;
    lab_technician: boolean;
    researcher: boolean;
  };
  consent_status: {
    clinical_use: boolean;
    research_participation: boolean;
    family_sharing: boolean;
    data_retention: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface GenomicAlert {
  id: string;
  patient_id: string;
  variant_id: string;
  alert_type: 'high_risk' | 'drug_interaction' | 'carrier_status' | 'family_history';
  severity: 'critical' | 'high' | 'moderate' | 'low';
  title: string;
  description: string;
  recommendations: string[];
  requires_counseling: boolean;
  created_at: string;
  acknowledged_by?: string;
  acknowledged_at?: string;
}

export interface UserGenomicsRole {
  user_id: string;
  role: 'patient' | 'physician' | 'genetic_counselor' | 'lab_technician' | 'researcher';
  permissions: {
    view_reports: boolean;
    upload_reports: boolean;
    interpret_variants: boolean;
    generate_alerts: boolean;
    access_research_data: boolean;
    counsel_patients: boolean;
  };
  certifications?: string[];
  license_number?: string;
}

class GenomicsService {
  // Known pathogenic variants database (simplified)
  private knownVariants = new Map<string, {
    significance: GenomicVariant['clinical_significance'];
    conditions: string[];
    recommendations: string[];
    drug_interactions?: string[];
  }>([
    ['BRCA1:c.68_69delAG', {
      significance: 'pathogenic',
      conditions: ['Breast Cancer', 'Ovarian Cancer'],
      recommendations: ['Enhanced screening', 'Genetic counseling', 'Consider prophylactic surgery'],
      drug_interactions: ['PARP inhibitors - increased sensitivity']
    }],
    ['BRCA2:c.5946delT', {
      significance: 'pathogenic',
      conditions: ['Breast Cancer', 'Ovarian Cancer', 'Prostate Cancer'],
      recommendations: ['Enhanced screening', 'Genetic counseling', 'Family cascade testing']
    }],
    ['CFTR:c.1521_1523delCTT', {
      significance: 'pathogenic',
      conditions: ['Cystic Fibrosis'],
      recommendations: ['Genetic counseling', 'Carrier screening for partner']
    }]
  ]);

  async uploadGenomicReport(file: File, metadata: {
    patient_id: string;
    test_type: GenomicReport['test_type'];
    lab_name?: string;
    uploader_role: UserGenomicsRole['role'];
  }): Promise<string> {
    console.log('Uploading genomic report:', file.name);
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/octet-stream'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only VCF and PDF files are allowed.');
    }

    // Check permissions
    if (!this.canUploadReports(metadata.uploader_role)) {
      throw new Error('Insufficient permissions to upload genomic reports.');
    }

    // Simulate file upload
    const fileUrl = `genomics/${metadata.patient_id}/${Date.now()}-${file.name}`;
    
    // Parse file if VCF
    let variants: GenomicVariant[] = [];
    if (file.name.endsWith('.vcf') || file.type === 'text/plain') {
      variants = await this.parseVCF(file);
    }

    // Create report
    const report: GenomicReport = {
      id: `genomic-${Date.now()}`,
      patient_id: metadata.patient_id,
      report_type: file.name.endsWith('.vcf') ? 'vcf' : 'pdf',
      file_url: fileUrl,
      file_name: file.name,
      upload_date: new Date().toISOString(),
      lab_name: metadata.lab_name,
      test_type: metadata.test_type,
      variants,
      summary: {
        total_variants: variants.length,
        pathogenic_variants: variants.filter(v => v.clinical_significance === 'pathogenic').length,
        actionable_variants: variants.filter(v => v.recommendations && v.recommendations.length > 0).length
      },
      access_permissions: this.getDefaultAccessPermissions(metadata.uploader_role),
      consent_status: {
        clinical_use: true,
        research_participation: false,
        family_sharing: false,
        data_retention: true
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Generate alerts for significant variants
    await this.generateAlertsForReport(report);

    return report.id;
  }

  private async parseVCF(file: File): Promise<GenomicVariant[]> {
    const text = await file.text();
    const lines = text.split('\n');
    const variants: GenomicVariant[] = [];

    for (const line of lines) {
      if (line.startsWith('#') || !line.trim()) continue;

      const columns = line.split('\t');
      if (columns.length < 8) continue;

      const [chrom, pos, id, ref, alt, qual, filter, info] = columns;
      
      // Extract gene information from INFO field
      const geneMatch = info.match(/GENE=([^;]+)/);
      const gene = geneMatch ? geneMatch[1] : undefined;

      const variant: GenomicVariant = {
        id: id === '.' ? `${chrom}:${pos}:${ref}:${alt}` : id,
        chromosome: chrom,
        position: parseInt(pos),
        reference: ref,
        alternate: alt,
        gene,
        variant_type: this.determineVariantType(ref, alt),
        clinical_significance: this.assessClinicalSignificance(`${gene}:${ref}>${alt}`),
        quality_score: qual === '.' ? undefined : parseFloat(qual),
        allele_frequency: this.extractAlleleFrequency(info),
        depth: this.extractDepth(info),
        genotype: columns[9] ? columns[9].split(':')[0] : undefined,
        associated_conditions: [],
        drug_interactions: [],
        recommendations: []
      };

      // Enhance with known variant data
      this.enhanceVariantWithKnownData(variant);
      variants.push(variant);
    }

    return variants;
  }

  private determineVariantType(ref: string, alt: string): GenomicVariant['variant_type'] {
    if (ref.length === 1 && alt.length === 1) return 'SNV';
    if (ref.length !== alt.length) return 'INDEL';
    return 'CNV';
  }

  private assessClinicalSignificance(variantString: string): GenomicVariant['clinical_significance'] {
    const knownVariant = this.knownVariants.get(variantString);
    return knownVariant?.significance || 'uncertain';
  }

  private enhanceVariantWithKnownData(variant: GenomicVariant): void {
    const variantKey = `${variant.gene}:${variant.reference}>${variant.alternate}`;
    const knownData = this.knownVariants.get(variantKey);
    
    if (knownData) {
      variant.clinical_significance = knownData.significance;
      variant.associated_conditions = knownData.conditions;
      variant.recommendations = knownData.recommendations;
      variant.drug_interactions = knownData.drug_interactions || [];
    }
  }

  private extractAlleleFrequency(info: string): number | undefined {
    const afMatch = info.match(/AF=([^;]+)/);
    return afMatch ? parseFloat(afMatch[1]) : undefined;
  }

  private extractDepth(info: string): number | undefined {
    const dpMatch = info.match(/DP=([^;]+)/);
    return dpMatch ? parseInt(dpMatch[1]) : undefined;
  }

  private async generateAlertsForReport(report: GenomicReport): Promise<void> {
    const alerts: GenomicAlert[] = [];

    for (const variant of report.variants) {
      if (variant.clinical_significance === 'pathogenic' || variant.clinical_significance === 'likely_pathogenic') {
        alerts.push({
          id: `alert-${Date.now()}-${variant.id}`,
          patient_id: report.patient_id,
          variant_id: variant.id,
          alert_type: 'high_risk',
          severity: variant.clinical_significance === 'pathogenic' ? 'critical' : 'high',
          title: `Pathogenic Variant Detected: ${variant.gene}`,
          description: `A ${variant.clinical_significance} variant has been identified in the ${variant.gene} gene.`,
          recommendations: variant.recommendations || [],
          requires_counseling: true,
          created_at: new Date().toISOString()
        });
      }

      if (variant.drug_interactions && variant.drug_interactions.length > 0) {
        alerts.push({
          id: `alert-${Date.now()}-drug-${variant.id}`,
          patient_id: report.patient_id,
          variant_id: variant.id,
          alert_type: 'drug_interaction',
          severity: 'moderate',
          title: `Drug Interaction Alert: ${variant.gene}`,
          description: `This variant may affect drug metabolism and response.`,
          recommendations: variant.drug_interactions,
          requires_counseling: false,
          created_at: new Date().toISOString()
        });
      }
    }

    // Store alerts (in real implementation, would save to database)
    console.log('Generated genomic alerts:', alerts);
  }

  private canUploadReports(role: UserGenomicsRole['role']): boolean {
    const permissions = this.getRolePermissions(role);
    return permissions.upload_reports;
  }

  private getRolePermissions(role: UserGenomicsRole['role']): UserGenomicsRole['permissions'] {
    const rolePermissions: Record<UserGenomicsRole['role'], UserGenomicsRole['permissions']> = {
      patient: {
        view_reports: true,
        upload_reports: false,
        interpret_variants: false,
        generate_alerts: false,
        access_research_data: false,
        counsel_patients: false
      },
      physician: {
        view_reports: true,
        upload_reports: true,
        interpret_variants: true,
        generate_alerts: true,
        access_research_data: false,
        counsel_patients: false
      },
      genetic_counselor: {
        view_reports: true,
        upload_reports: true,
        interpret_variants: true,
        generate_alerts: true,
        access_research_data: true,
        counsel_patients: true
      },
      lab_technician: {
        view_reports: true,
        upload_reports: true,
        interpret_variants: false,
        generate_alerts: false,
        access_research_data: false,
        counsel_patients: false
      },
      researcher: {
        view_reports: true,
        upload_reports: false,
        interpret_variants: true,
        generate_alerts: false,
        access_research_data: true,
        counsel_patients: false
      }
    };

    return rolePermissions[role];
  }

  private getDefaultAccessPermissions(uploaderRole: UserGenomicsRole['role']): GenomicReport['access_permissions'] {
    return {
      patient: true,
      primary_physician: true,
      genetic_counselor: true,
      lab_technician: uploaderRole === 'lab_technician',
      researcher: false
    };
  }

  async getGenomicReports(patientId: string, userRole: UserGenomicsRole['role']): Promise<GenomicReport[]> {
    // Mock data - in real implementation, fetch from database
    const mockReports: GenomicReport[] = [
      {
        id: 'genomic-001',
        patient_id: patientId,
        report_type: 'vcf',
        file_url: 'genomics/sample-whole-genome.vcf',
        file_name: 'whole-genome-sequencing.vcf',
        upload_date: '2024-12-20T10:00:00Z',
        lab_name: 'National Human Genome Research Institute',
        test_type: 'whole_genome',
        variants: [
          {
            id: 'BRCA1:c.68_69delAG',
            chromosome: '17',
            position: 41197708,
            reference: 'AGT',
            alternate: 'A',
            gene: 'BRCA1',
            variant_type: 'INDEL',
            clinical_significance: 'pathogenic',
            associated_conditions: ['Breast Cancer', 'Ovarian Cancer'],
            recommendations: ['Enhanced screening', 'Genetic counseling', 'Consider prophylactic surgery'],
            drug_interactions: ['PARP inhibitors - increased sensitivity']
          }
        ],
        summary: {
          total_variants: 4523,
          pathogenic_variants: 1,
          actionable_variants: 3
        },
        access_permissions: {
          patient: true,
          primary_physician: true,
          genetic_counselor: true,
          lab_technician: true,
          researcher: false
        },
        consent_status: {
          clinical_use: true,
          research_participation: false,
          family_sharing: false,
          data_retention: true
        },
        created_at: '2024-12-20T10:00:00Z',
        updated_at: '2024-12-20T10:00:00Z'
      }
    ];

    // Filter based on user role permissions
    return mockReports.filter(report => this.canAccessReport(report, userRole));
  }

  private canAccessReport(report: GenomicReport, userRole: UserGenomicsRole['role']): boolean {
    const permissions = this.getRolePermissions(userRole);
    return permissions.view_reports;
  }

  async getGenomicAlerts(patientId: string): Promise<GenomicAlert[]> {
    // Mock alerts
    return [
      {
        id: 'alert-001',
        patient_id: patientId,
        variant_id: 'BRCA1:c.68_69delAG',
        alert_type: 'high_risk',
        severity: 'critical',
        title: 'High-Risk BRCA1 Mutation Detected',
        description: 'A pathogenic BRCA1 mutation associated with increased breast and ovarian cancer risk has been identified.',
        recommendations: [
          'Schedule genetic counseling appointment',
          'Consider enhanced screening protocol',
          'Discuss risk-reducing strategies',
          'Cascade testing for family members'
        ],
        requires_counseling: true,
        created_at: '2024-12-20T10:30:00Z'
      }
    ];
  }

  async acknowledgeAlert(alertId: string, userId: string): Promise<void> {
    console.log(`Alert ${alertId} acknowledged by user ${userId}`);
  }
}

export const genomicsService = new GenomicsService();
