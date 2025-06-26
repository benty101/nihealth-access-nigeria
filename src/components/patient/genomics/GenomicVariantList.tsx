
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  Info, 
  Dna, 
  Pill,
  Users,
  Eye,
  ChevronRight
} from 'lucide-react';
import { type GenomicReport, type GenomicVariant, type UserGenomicsRole } from '@/services/GenomicsService';

interface GenomicVariantListProps {
  reports: GenomicReport[];
  userRole: UserGenomicsRole['role'];
}

const GenomicVariantList = ({ reports, userRole }: GenomicVariantListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSignificance, setSelectedSignificance] = useState<string>('all');
  const [selectedChromosome, setSelectedChromosome] = useState<string>('all');
  const [selectedVariantType, setSelectedVariantType] = useState<string>('all');
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);

  // Flatten all variants from all reports
  const allVariants = useMemo(() => {
    return reports.flatMap(report => 
      report.variants.map(variant => ({
        ...variant,
        reportId: report.id,
        reportName: report.file_name
      }))
    );
  }, [reports]);

  // Filter variants based on search and filters
  const filteredVariants = useMemo(() => {
    return allVariants.filter(variant => {
      const matchesSearch = searchTerm === '' || 
        variant.gene?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        variant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        variant.associated_conditions?.some(condition => 
          condition.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSignificance = selectedSignificance === 'all' || 
        variant.clinical_significance === selectedSignificance;

      const matchesChromosome = selectedChromosome === 'all' || 
        variant.chromosome === selectedChromosome;

      const matchesVariantType = selectedVariantType === 'all' || 
        variant.variant_type === selectedVariantType;

      return matchesSearch && matchesSignificance && matchesChromosome && matchesVariantType;
    });
  }, [allVariants, searchTerm, selectedSignificance, selectedChromosome, selectedVariantType]);

  // Get unique chromosomes for filter
  const uniqueChromosomes = useMemo(() => {
    const chromosomes = [...new Set(allVariants.map(v => v.chromosome))];
    return chromosomes.sort((a, b) => {
      // Sort chromosomes numerically, then X, Y, MT
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
      if (!isNaN(aNum)) return -1;
      if (!isNaN(bNum)) return 1;
      return a.localeCompare(b);
    });
  }, [allVariants]);

  const getSignificanceBadge = (significance: GenomicVariant['clinical_significance']) => {
    const variants = {
      pathogenic: { color: 'bg-red-100 text-red-800', label: 'Pathogenic' },
      likely_pathogenic: { color: 'bg-orange-100 text-orange-800', label: 'Likely Pathogenic' },
      uncertain: { color: 'bg-yellow-100 text-yellow-800', label: 'Uncertain' },
      likely_benign: { color: 'bg-green-100 text-green-800', label: 'Likely Benign' },
      benign: { color: 'bg-gray-100 text-gray-800', label: 'Benign' }
    };
    
    const variant = variants[significance];
    return (
      <Badge className={variant.color}>
        {variant.label}
      </Badge>
    );
  };

  const getVariantTypeIcon = (type: GenomicVariant['variant_type']) => {
    switch (type) {
      case 'SNV': return <span className="text-blue-600">SNV</span>;
      case 'INDEL': return <span className="text-purple-600">INDEL</span>;
      case 'CNV': return <span className="text-orange-600">CNV</span>;
      case 'SV': return <span className="text-red-600">SV</span>;
      default: return <span className="text-gray-600">{type}</span>;
    }
  };

  const canViewDetailedVariants = () => {
    return userRole === 'physician' || userRole === 'genetic_counselor' || userRole === 'researcher';
  };

  if (allVariants.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Dna className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Variants Available</h3>
          <p className="text-gray-600">Upload genomic reports to view variant analysis</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search genes, variants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSignificance} onValueChange={setSelectedSignificance}>
              <SelectTrigger>
                <SelectValue placeholder="Clinical Significance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Significance</SelectItem>
                <SelectItem value="pathogenic">Pathogenic</SelectItem>
                <SelectItem value="likely_pathogenic">Likely Pathogenic</SelectItem>
                <SelectItem value="uncertain">Uncertain</SelectItem>
                <SelectItem value="likely_benign">Likely Benign</SelectItem>
                <SelectItem value="benign">Benign</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedChromosome} onValueChange={setSelectedChromosome}>
              <SelectTrigger>
                <SelectValue placeholder="Chromosome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chromosomes</SelectItem>
                {uniqueChromosomes.map(chr => (
                  <SelectItem key={chr} value={chr}>Chr {chr}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedVariantType} onValueChange={setSelectedVariantType}>
              <SelectTrigger>
                <SelectValue placeholder="Variant Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="SNV">SNV</SelectItem>
                <SelectItem value="INDEL">INDEL</SelectItem>
                <SelectItem value="CNV">CNV</SelectItem>
                <SelectItem value="SV">SV</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedSignificance('all');
              setSelectedChromosome('all');
              setSelectedVariantType('all');
            }}>
              Clear Filters
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredVariants.length} of {allVariants.length} variants
          </div>
        </CardContent>
      </Card>

      {/* Variants List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5" />
            Genetic Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVariants.map((variant) => (
              <div key={`${variant.reportId}-${variant.id}`} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getVariantTypeIcon(variant.variant_type)}
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {variant.gene || 'Unknown Gene'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      Chr{variant.chromosome}:{variant.position.toLocaleString()}
                    </div>
                    
                    {getSignificanceBadge(variant.clinical_significance)}
                  </div>

                  <div className="flex items-center gap-2">
                    {(variant.clinical_significance === 'pathogenic' || variant.clinical_significance === 'likely_pathogenic') && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    
                    {variant.drug_interactions && variant.drug_interactions.length > 0 && (
                      <Pill className="h-4 w-4 text-blue-500" />
                    )}
                    
                    {variant.recommendations && variant.recommendations.length > 0 && (
                      <Users className="h-4 w-4 text-purple-500" />
                    )}

                    {canViewDetailedVariants() && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedVariant(
                          expandedVariant === `${variant.reportId}-${variant.id}` 
                            ? null 
                            : `${variant.reportId}-${variant.id}`
                        )}
                      >
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform ${
                            expandedVariant === `${variant.reportId}-${variant.id}` ? 'rotate-90' : ''
                          }`} 
                        />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-700">
                  <span className="font-medium">Change:</span> {variant.reference} → {variant.alternate}
                  {variant.genotype && (
                    <span className="ml-4">
                      <span className="font-medium">Genotype:</span> {variant.genotype}
                    </span>
                  )}
                </div>

                {variant.associated_conditions && variant.associated_conditions.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">Associated Conditions:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {variant.associated_conditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expanded Details */}
                {canViewDetailedVariants() && expandedVariant === `${variant.reportId}-${variant.id}` && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                    {variant.quality_score && (
                      <div className="text-sm">
                        <span className="font-medium">Quality Score:</span> {variant.quality_score}
                      </div>
                    )}
                    
                    {variant.allele_frequency && (
                      <div className="text-sm">
                        <span className="font-medium">Allele Frequency:</span> {(variant.allele_frequency * 100).toFixed(4)}%
                      </div>
                    )}
                    
                    {variant.depth && (
                      <div className="text-sm">
                        <span className="font-medium">Read Depth:</span> {variant.depth}x
                      </div>
                    )}

                    {variant.inheritance_pattern && (
                      <div className="text-sm">
                        <span className="font-medium">Inheritance Pattern:</span> {variant.inheritance_pattern.replace('_', ' ')}
                      </div>
                    )}

                    {variant.drug_interactions && variant.drug_interactions.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">Drug Interactions:</span>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                          {variant.drug_interactions.map((interaction, index) => (
                            <li key={index}>{interaction}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {variant.recommendations && variant.recommendations.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">Clinical Recommendations:</span>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                          {variant.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 border-t pt-2">
                      <span className="font-medium">Source Report:</span> {variant.reportName}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenomicVariantList;
