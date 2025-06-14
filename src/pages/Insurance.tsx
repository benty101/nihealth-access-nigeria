import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Users, Shield, Filter, Scale, ArrowUpDown } from 'lucide-react';
import InsuranceFilters from '@/components/insurance/InsuranceFilters';
import InsuranceComparison from '@/components/insurance/InsuranceComparison';
import PaymentMethods from '@/components/insurance/PaymentMethods';

const Insurance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: [1000, 50000],
    coverage: 'all',
    type: 'all',
    features: [] as string[],
    rating: 0
  });

  const insurancePlans = [
    // Premium/Popular Plans
    {
      id: '1',
      name: 'Hygeia HMO',
      type: 'Premium HMO',
      monthlyPremium: '₦14,500',
      coverage: '₦5,000,000',
      rating: 4.8,
      features: ['Premium HMO', 'Excellent Maternity', 'Wellness', 'Emergency', 'Digital Health'],
      popular: true
    },
    {
      id: '2',
      name: 'AIICO Multishield HMO',
      type: 'Premium Health',
      monthlyPremium: '₦15,000',
      coverage: '₦5,000,000',
      rating: 4.5,
      features: ['Outpatient Care', 'Surgery', 'Maternity', 'Dental', 'Optical'],
      popular: true
    },
    {
      id: '3',
      name: 'Sterling Health HMO',
      type: 'Sterling Premium',
      monthlyPremium: '₦18,500',
      coverage: '₦7,500,000',
      rating: 4.5,
      features: ['Sterling Network', 'Premium Maternity', 'Executive Care', 'Emergency', 'International'],
      popular: true
    },
    {
      id: '4',
      name: 'AXA Mansard Health',
      type: 'Comprehensive Health',
      monthlyPremium: '₦16,000',
      coverage: '₦6,000,000',
      rating: 4.4,
      features: ['Comprehensive Care', 'International Coverage', 'Maternity', 'Dental', 'Emergency'],
      popular: true
    },
    {
      id: '5',
      name: 'Leadway Health Limited',
      type: 'Family Health Plan',
      monthlyPremium: '₦25,000',
      coverage: '₦10,000,000',
      rating: 4.3,
      features: ['Family Coverage', 'Emergency Care', 'Specialist Visits', 'Prescription', 'Maternity'],
      popular: true
    },
    {
      id: '6',
      name: 'Total Health Trust',
      type: 'Comprehensive HMO',
      monthlyPremium: '₦13,200',
      coverage: '₦4,500,000',
      rating: 4.2,
      features: ['Comprehensive Care', 'Maternity', 'Emergency', 'Outpatient', 'Prescription'],
      popular: false
    },
    {
      id: '7',
      name: 'Clearline International',
      type: 'Executive Health',
      monthlyPremium: '₦19,800',
      coverage: '₦8,000,000',
      rating: 4.1,
      features: ['Executive Care', 'International', 'Surgery', 'Maternity', 'Dental'],
      popular: false
    },
    {
      id: '8',
      name: 'HCI Healthcare Limited',
      type: 'Premium Healthcare',
      monthlyPremium: '₦17,500',
      coverage: '₦6,500,000',
      rating: 4.0,
      features: ['Premium Care', 'Maternity', 'Surgery', 'Emergency', 'Optical'],
      popular: false
    },
    {
      id: '9',
      name: 'Mediplan Healthcare',
      type: 'Standard Health Plan',
      monthlyPremium: '₦11,000',
      coverage: '₦3,500,000',
      rating: 3.9,
      features: ['Standard Care', 'Maternity', 'Emergency', 'Outpatient', 'Basic Surgery'],
      popular: false
    },
    {
      id: '10',
      name: 'United Healthcare International',
      type: 'International Health',
      monthlyPremium: '₦22,000',
      coverage: '₦9,000,000',
      rating: 4.3,
      features: ['International Coverage', 'Executive Care', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '11',
      name: 'Ronsberger HMO',
      type: 'Standard HMO',
      monthlyPremium: '₦9,500',
      coverage: '₦3,000,000',
      rating: 3.8,
      features: ['Basic Care', 'Maternity', 'Emergency', 'Outpatient', 'Prescription'],
      popular: false
    },
    {
      id: '12',
      name: 'International Health Management Services',
      type: 'Premium Management',
      monthlyPremium: '₦16,800',
      coverage: '₦6,200,000',
      rating: 4.1,
      features: ['Management Services', 'International', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '13',
      name: 'Songhai HMO',
      type: 'Agricultural Health',
      monthlyPremium: '₦8,200',
      coverage: '₦2,800,000',
      rating: 3.7,
      features: ['Rural Coverage', 'Basic Care', 'Maternity', 'Emergency', 'Community Health'],
      popular: false
    },
    {
      id: '14',
      name: 'Integrated Health Care Limited',
      type: 'Integrated Health',
      monthlyPremium: '₦12,500',
      coverage: '₦4,000,000',
      rating: 4.0,
      features: ['Integrated Care', 'Maternity', 'Surgery', 'Emergency', 'Wellness'],
      popular: false
    },
    {
      id: '15',
      name: 'Sunu Healthcare Services',
      type: 'Managed Healthcare',
      monthlyPremium: '₦10,800',
      coverage: '₦3,200,000',
      rating: 3.9,
      features: ['Managed Care', 'Maternity', 'Emergency', 'Outpatient', 'Prescription'],
      popular: false
    },
    {
      id: '16',
      name: 'Princeton Health',
      type: 'Premium Health',
      monthlyPremium: '₦15,500',
      coverage: '₦5,500,000',
      rating: 4.2,
      features: ['Premium Care', 'Academic Network', 'Maternity', 'Surgery', 'Research'],
      popular: false
    },
    {
      id: '17',
      name: 'Venus Medicare',
      type: 'Standard Medicare',
      monthlyPremium: '₦9,800',
      coverage: '₦3,100,000',
      rating: 3.8,
      features: ['Standard Care', 'Maternity', 'Emergency', 'Outpatient', 'Basic Surgery'],
      popular: false
    },
    {
      id: '18',
      name: 'Defence Health Maintenance',
      type: 'Military Health',
      monthlyPremium: '₦12,000',
      coverage: '₦4,200,000',
      rating: 4.1,
      features: ['Military Network', 'Comprehensive Care', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '19',
      name: 'United Comprehensive Healthcare',
      type: 'Comprehensive Health',
      monthlyPremium: '₦14,200',
      coverage: '₦4,800,000',
      rating: 4.0,
      features: ['Comprehensive Care', 'Maternity', 'Surgery', 'Emergency', 'Specialist'],
      popular: false
    },
    {
      id: '20',
      name: 'Veritas Healthcare Limited',
      type: 'Security Health',
      monthlyPremium: '₦13,500',
      coverage: '₦4,500,000',
      rating: 3.9,
      features: ['Security Network', 'Comprehensive Care', 'Maternity', 'Emergency', 'Surgery'],
      popular: false
    },
    {
      id: '21',
      name: 'Royal Health Maintenance',
      type: 'Royal Health',
      monthlyPremium: '₦16,200',
      coverage: '₦5,800,000',
      rating: 4.2,
      features: ['Royal Care', 'Premium Service', 'Maternity', 'Surgery', 'Executive'],
      popular: false
    },
    {
      id: '22',
      name: 'Zuma Health',
      type: 'Modern Health',
      monthlyPremium: '₦11,500',
      coverage: '₦3,800,000',
      rating: 3.8,
      features: ['Modern Care', 'Digital Health', 'Maternity', 'Emergency', 'Telemedicine'],
      popular: false
    },
    {
      id: '23',
      name: 'Markfema Nigeria',
      type: 'Corporate Health',
      monthlyPremium: '₦13,800',
      coverage: '₦4,600,000',
      rating: 3.9,
      features: ['Corporate Care', 'Employee Health', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '24',
      name: 'Prepaid Medicare Services',
      type: 'Prepaid Health',
      monthlyPremium: '₦8,800',
      coverage: '₦2,900,000',
      rating: 3.7,
      features: ['Prepaid Care', 'Basic Health', 'Maternity', 'Emergency', 'Outpatient'],
      popular: false
    },
    {
      id: '25',
      name: 'Health Partners Limited',
      type: 'Partnership Health',
      monthlyPremium: '₦12,200',
      coverage: '₦4,100,000',
      rating: 4.0,
      features: ['Partnership Care', 'Network Health', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '26',
      name: 'Precious Healthcare',
      type: 'Premium Healthcare',
      monthlyPremium: '₦14,800',
      coverage: '₦5,200,000',
      rating: 4.1,
      features: ['Premium Care', 'Precious Service', 'Maternity', 'Surgery', 'Wellness'],
      popular: false
    },
    {
      id: '27',
      name: 'Oceanic Health Management',
      type: 'Maritime Health',
      monthlyPremium: '₦15,200',
      coverage: '₦5,400,000',
      rating: 4.0,
      features: ['Maritime Care', 'Offshore Health', 'Maternity', 'Emergency', 'International'],
      popular: false
    },
    {
      id: '28',
      name: 'Wellness Health Management',
      type: 'Wellness Focus',
      monthlyPremium: '₦13,000',
      coverage: '₦4,300,000',
      rating: 4.1,
      features: ['Wellness Programs', 'Preventive Care', 'Maternity', 'Mental Health', 'Fitness'],
      popular: false
    },
    {
      id: '29',
      name: 'GreenBay Healthcare Services',
      type: 'Environmental Health',
      monthlyPremium: '₦11,800',
      coverage: '₦3,900,000',
      rating: 3.8,
      features: ['Environmental Care', 'Green Health', 'Maternity', 'Emergency', 'Sustainability'],
      popular: false
    },
    {
      id: '30',
      name: 'Medexia Limited',
      type: 'Medical Excellence',
      monthlyPremium: '₦16,500',
      coverage: '₦6,000,000',
      rating: 4.2,
      features: ['Medical Excellence', 'Advanced Care', 'Maternity', 'Surgery', 'Specialist'],
      popular: false
    },
    {
      id: '31',
      name: 'Marina Medical Services',
      type: 'Marina Health',
      monthlyPremium: '₦17,200',
      coverage: '₦6,300,000',
      rating: 4.1,
      features: ['Marina Network', 'Premium Care', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '32',
      name: 'Non-Such Medicare',
      type: 'Unique Medicare',
      monthlyPremium: '₦10,500',
      coverage: '₦3,400,000',
      rating: 3.8,
      features: ['Unique Care', 'Specialized Service', 'Maternity', 'Emergency', 'Outpatient'],
      popular: false
    },
    {
      id: '33',
      name: 'Salus Trust GTE',
      type: 'Trust Health',
      monthlyPremium: '₦12,800',
      coverage: '₦4,200,000',
      rating: 3.9,
      features: ['Trust Network', 'Reliable Care', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '34',
      name: 'Prohealth HMO',
      type: 'Professional Health',
      monthlyPremium: '₦14,000',
      coverage: '₦4,700,000',
      rating: 4.0,
      features: ['Professional Care', 'Expert Network', 'Maternity', 'Surgery', 'Specialist'],
      popular: false
    },
    {
      id: '35',
      name: 'GNI Healthcare Limited',
      type: 'Regional Health (SW)',
      monthlyPremium: '₦9,200',
      coverage: '₦3,000,000',
      rating: 3.7,
      features: ['Regional Care', 'Southwest Focus', 'Maternity', 'Emergency', 'Community'],
      popular: false
    },
    {
      id: '36',
      name: 'Ultimate Health Management',
      type: 'Ultimate Care',
      monthlyPremium: '₦18,800',
      coverage: '₦7,200,000',
      rating: 4.3,
      features: ['Ultimate Care', 'Premium Service', 'Maternity', 'Surgery', 'Executive'],
      popular: false
    },
    {
      id: '37',
      name: 'Avon Healthcare Limited',
      type: 'Avon Health',
      monthlyPremium: '₦15,800',
      coverage: '₦5,600,000',
      rating: 4.1,
      features: ['Avon Network', 'Quality Care', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '38',
      name: 'Regenix Healthcare Service',
      type: 'Regenerative Health',
      monthlyPremium: '₦16,800',
      coverage: '₦6,100,000',
      rating: 4.0,
      features: ['Regenerative Medicine', 'Advanced Care', 'Maternity', 'Surgery', 'Research'],
      popular: false
    },
    {
      id: '39',
      name: 'Redcare Health Services',
      type: 'Emergency Focus',
      monthlyPremium: '₦11,200',
      coverage: '₦3,600,000',
      rating: 3.9,
      features: ['Emergency Focus', 'Critical Care', 'Maternity', 'Surgery', '24/7 Service'],
      popular: false
    },
    {
      id: '40',
      name: 'Well Health Network',
      type: 'State Health (Enugu)',
      monthlyPremium: '₦7,500',
      coverage: '₦2,500,000',
      rating: 3.6,
      features: ['State Coverage', 'Enugu Focus', 'Maternity', 'Emergency', 'Community'],
      popular: false
    },
    {
      id: '41',
      name: 'Ives Medicare',
      type: 'State Health (Lagos)',
      monthlyPremium: '₦10,800',
      coverage: '₦3,300,000',
      rating: 3.8,
      features: ['Lagos Focus', 'Urban Care', 'Maternity', 'Emergency', 'Specialist'],
      popular: false
    },
    {
      id: '42',
      name: 'Medicare Alliance Limited',
      type: 'Alliance Health',
      monthlyPremium: '₦9,800',
      coverage: '₦3,100,000',
      rating: 3.7,
      features: ['Alliance Network', 'Partnership Care', 'Maternity', 'Emergency', 'Outpatient'],
      popular: false
    },
    {
      id: '43',
      name: 'Police Health Maintenance',
      type: 'Police Health',
      monthlyPremium: '₦11,500',
      coverage: '₦3,700,000',
      rating: 4.0,
      features: ['Police Network', 'Security Health', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '44',
      name: 'Novo Health Africa',
      type: 'Pan-African Health',
      monthlyPremium: '₦17,500',
      coverage: '₦6,500,000',
      rating: 4.2,
      features: ['Pan-African', 'International', 'Maternity', 'Surgery', 'Research'],
      popular: false
    },
    {
      id: '45',
      name: 'Anchor HMO International',
      type: 'International HMO',
      monthlyPremium: '₦19,200',
      coverage: '₦7,800,000',
      rating: 4.3,
      features: ['International Coverage', 'Anchor Network', 'Maternity', 'Surgery', 'Executive'],
      popular: false
    },
    {
      id: '46',
      name: 'Metrohealth HMO',
      type: 'Metropolitan Health',
      monthlyPremium: '₦13,500',
      coverage: '₦4,500,000',
      rating: 3.9,
      features: ['Metro Coverage', 'Urban Health', 'Maternity', 'Emergency', 'Specialist'],
      popular: false
    },
    {
      id: '47',
      name: 'Greenfield Health Management',
      type: 'Green Health',
      monthlyPremium: '₦12,000',
      coverage: '₦4,000,000',
      rating: 3.8,
      features: ['Green Care', 'Environmental Health', 'Maternity', 'Emergency', 'Wellness'],
      popular: false
    },
    {
      id: '48',
      name: 'LifeWorth Medicare',
      type: 'State Health (Lagos)',
      monthlyPremium: '₦11,800',
      coverage: '₦3,800,000',
      rating: 3.8,
      features: ['Lagos Focus', 'Life Enhancement', 'Maternity', 'Emergency', 'Wellness'],
      popular: false
    },
    {
      id: '49',
      name: 'NNPC HMO Limited',
      type: 'Oil & Gas Health',
      monthlyPremium: '₦20,000',
      coverage: '₦8,500,000',
      rating: 4.4,
      features: ['Oil & Gas', 'Corporate Health', 'Maternity', 'Surgery', 'International'],
      popular: false
    },
    {
      id: '50',
      name: 'Health Assur Limited',
      type: 'State Health (Lagos)',
      monthlyPremium: '₦10,200',
      coverage: '₦3,200,000',
      rating: 3.7,
      features: ['Lagos Focus', 'Assured Care', 'Maternity', 'Emergency', 'Outpatient'],
      popular: false
    },
    {
      id: '51',
      name: 'Phillips Health Management',
      type: 'Regional Health (SW)',
      monthlyPremium: '₦8,800',
      coverage: '₦2,800,000',
      rating: 3.6,
      features: ['Southwest Focus', 'Regional Care', 'Maternity', 'Emergency', 'Community'],
      popular: false
    },
    {
      id: '52',
      name: 'Ashmed Integrated Health',
      type: 'Integrated Health',
      monthlyPremium: '₦13,200',
      coverage: '₦4,400,000',
      rating: 3.9,
      features: ['Integrated Care', 'Comprehensive', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '53',
      name: 'Synergy Wellcare Medicaid',
      type: 'Synergy Health',
      monthlyPremium: '₦12,500',
      coverage: '₦4,100,000',
      rating: 3.8,
      features: ['Synergy Care', 'Wellcare Focus', 'Maternity', 'Emergency', 'Wellness'],
      popular: false
    },
    {
      id: '54',
      name: 'Reliance HMO',
      type: 'Reliable Health',
      monthlyPremium: '₦14,500',
      coverage: '₦4,900,000',
      rating: 4.0,
      features: ['Reliable Care', 'Trusted Network', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '55',
      name: 'Roding Healthcare Limited',
      type: 'State Health (Lagos)',
      monthlyPremium: '₦9,500',
      coverage: '₦3,000,000',
      rating: 3.7,
      features: ['Lagos Focus', 'Urban Care', 'Maternity', 'Emergency', 'Outpatient'],
      popular: false
    },
    {
      id: '56',
      name: 'Fountain Healthcare Limited',
      type: 'State Health (Lagos)',
      monthlyPremium: '₦10,000',
      coverage: '₦3,200,000',
      rating: 3.7,
      features: ['Lagos Focus', 'Fountain Care', 'Maternity', 'Emergency', 'Wellness'],
      popular: false
    },
    {
      id: '57',
      name: 'Hallmark HMO',
      type: 'Quality Health',
      monthlyPremium: '₦15,000',
      coverage: '₦5,000,000',
      rating: 4.1,
      features: ['Quality Assured', 'Hallmark Service', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '58',
      name: 'Bastion Health Limited',
      type: 'Fortress Health',
      monthlyPremium: '₦16,000',
      coverage: '₦5,500,000',
      rating: 4.0,
      features: ['Fortress Care', 'Strong Network', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '59',
      name: 'Maayoit Healthcare',
      type: 'Modern Healthcare',
      monthlyPremium: '₦13,800',
      coverage: '₦4,600,000',
      rating: 3.9,
      features: ['Modern Care', 'Innovation Focus', 'Maternity', 'Emergency', 'Technology'],
      popular: false
    },
    {
      id: '60',
      name: 'Century Medicaid Services',
      type: 'Century Health',
      monthlyPremium: '₦11,000',
      coverage: '₦3,500,000',
      rating: 3.8,
      features: ['Century Care', 'Long-term Focus', 'Maternity', 'Emergency', 'Chronic Care'],
      popular: false
    },
    {
      id: '61',
      name: 'Royal Exchange Healthcare',
      type: 'Exchange Health',
      monthlyPremium: '₦17,800',
      coverage: '₦6,800,000',
      rating: 4.2,
      features: ['Exchange Network', 'Premium Care', 'Maternity', 'Surgery', 'International'],
      popular: false
    },
    {
      id: '62',
      name: 'Rothauge Healthcare',
      type: 'Professional Health',
      monthlyPremium: '₦14,200',
      coverage: '₦4,700,000',
      rating: 3.9,
      features: ['Professional Care', 'Expert Network', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '63',
      name: 'A&M Healthcare Trust',
      type: 'State Health',
      monthlyPremium: '₦8,500',
      coverage: '₦2,700,000',
      rating: 3.6,
      features: ['State Coverage', 'Trust Network', 'Maternity', 'Emergency', 'Community'],
      popular: false
    },
    {
      id: '64',
      name: 'Masslife Healthcare',
      type: 'Regional Health',
      monthlyPremium: '₦9,800',
      coverage: '₦3,100,000',
      rating: 3.7,
      features: ['Regional Care', 'Mass Coverage', 'Maternity', 'Emergency', 'Affordable'],
      popular: false
    },
    {
      id: '65',
      name: 'Skyda Health Limited',
      type: 'Sky Health',
      monthlyPremium: '₦12,800',
      coverage: '₦4,200,000',
      rating: 3.8,
      features: ['Sky Network', 'Elevated Care', 'Maternity', 'Emergency', 'Aviation'],
      popular: false
    },
    {
      id: '66',
      name: 'Peramare Health Management',
      type: 'Maritime Health',
      monthlyPremium: '₦15,500',
      coverage: '₦5,300,000',
      rating: 4.0,
      features: ['Maritime Focus', 'Offshore Care', 'Maternity', 'Emergency', 'International'],
      popular: false
    },
    {
      id: '67',
      name: 'Springtide Healthcare Services',
      type: 'Seasonal Health',
      monthlyPremium: '₦11,500',
      coverage: '₦3,700,000',
      rating: 3.8,
      features: ['Seasonal Care', 'Adaptive Health', 'Maternity', 'Emergency', 'Wellness'],
      popular: false
    },
    {
      id: '68',
      name: 'Seraph Nigeria Limited',
      type: 'Regional Health',
      monthlyPremium: '₦10,200',
      coverage: '₦3,300,000',
      rating: 3.7,
      features: ['Regional Care', 'Guardian Health', 'Maternity', 'Emergency', 'Protection'],
      popular: false
    },
    {
      id: '69',
      name: 'Grooming Health Management',
      type: 'Development Health',
      monthlyPremium: '₦13,000',
      coverage: '₦4,300,000',
      rating: 3.9,
      features: ['Development Focus', 'Growth Care', 'Maternity', 'Pediatrics', 'Family'],
      popular: false
    },
    {
      id: '70',
      name: 'Kennedia HMO',
      type: 'Regional HMO',
      monthlyPremium: '₦9,000',
      coverage: '₦2,900,000',
      rating: 3.6,
      features: ['Regional Care', 'Community Focus', 'Maternity', 'Emergency', 'Affordable'],
      popular: false
    },
    {
      id: '71',
      name: 'MB & O Healthcare Services',
      type: 'State Health (Lagos)',
      monthlyPremium: '₦10,500',
      coverage: '₦3,400,000',
      rating: 3.7,
      features: ['Lagos Focus', 'Partnership Care', 'Maternity', 'Emergency', 'Urban'],
      popular: false
    },
    {
      id: '72',
      name: 'Alleanza Health Management',
      type: 'Alliance Health',
      monthlyPremium: '₦14,800',
      coverage: '₦5,000,000',
      rating: 4.0,
      features: ['Alliance Network', 'Partnership Care', 'Maternity', 'Surgery', 'International'],
      popular: false
    },
    {
      id: '73',
      name: 'GORAH Healthcare Limited',
      type: 'Advanced Healthcare',
      monthlyPremium: '₦16,200',
      coverage: '₦5,700,000',
      rating: 4.1,
      features: ['Advanced Care', 'Technology Focus', 'Maternity', 'Surgery', 'Research'],
      popular: false
    },
    // Government and National Schemes
    {
      id: '74',
      name: 'NHIS (National Health Insurance Scheme)',
      type: 'Government Health Scheme',
      monthlyPremium: '₦3,000',
      coverage: '₦500,000',
      rating: 3.5,
      features: ['Government Backed', 'Basic Healthcare', 'Public Hospitals', 'Essential Drugs', 'Maternity Care'],
      popular: false
    },
    {
      id: '75',
      name: 'BHCPF (Basic Healthcare Provision Fund)',
      type: 'Government Health Fund',
      monthlyPremium: '₦2,500',
      coverage: '₦400,000',
      rating: 3.4,
      features: ['Government Fund', 'Basic Care', 'PHC Focus', 'Maternal Health', 'Child Health'],
      popular: false
    },
    // Additional Insurance Companies
    {
      id: '76',
      name: 'NEM Insurance',
      type: 'General Insurance',
      monthlyPremium: '₦12,000',
      coverage: '₦4,000,000',
      rating: 3.8,
      features: ['General Insurance', 'Health Coverage', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '77',
      name: 'Cornerstone Insurance',
      type: 'Foundation Health',
      monthlyPremium: '₦11,500',
      coverage: '₦3,800,000',
      rating: 3.9,
      features: ['Foundation Care', 'Solid Coverage', 'Maternity', 'Emergency', 'Specialist'],
      popular: false
    },
    {
      id: '78',
      name: 'Consolidated Hallmark Insurance',
      type: 'Consolidated Health',
      monthlyPremium: '₦13,800',
      coverage: '₦4,600,000',
      rating: 4.0,
      features: ['Consolidated Care', 'Hallmark Service', 'Maternity', 'Surgery', 'Emergency'],
      popular: false
    },
    {
      id: '79',
      name: 'Guinea Insurance',
      type: 'Regional Insurance',
      monthlyPremium: '₦10,800',
      coverage: '₦3,500,000',
      rating: 3.7,
      features: ['Regional Coverage', 'Traditional Care', 'Maternity', 'Emergency', 'Community'],
      popular: false
    },
    {
      id: '80',
      name: 'Sovereign Trust Insurance',
      type: 'Trust Insurance',
      monthlyPremium: '₦15,200',
      coverage: '₦5,200,000',
      rating: 4.1,
      features: ['Trust Network', 'Sovereign Care', 'Maternity', 'Surgery', 'Premium'],
      popular: false
    },
    {
      id: '81',
      name: 'FBN Insurance',
      type: 'Banking Insurance',
      monthlyPremium: '₦16,500',
      coverage: '₦5,800,000',
      rating: 4.2,
      features: ['Banking Network', 'Financial Health', 'Maternity', 'Surgery', 'Investment'],
      popular: false
    },
    {
      id: '82',
      name: 'Mutual Benefits Assurance',
      type: 'Mutual Benefits',
      monthlyPremium: '₦12,200',
      coverage: '₦4,100,000',
      rating: 3.8,
      features: ['Mutual Benefits', 'Shared Care', 'Maternity', 'Emergency', 'Community'],
      popular: false
    },
    {
      id: '83',
      name: 'Prestige Assurance',
      type: 'Prestige Health',
      monthlyPremium: '₦17,000',
      coverage: '₦6,200,000',
      rating: 4.2,
      features: ['Prestige Care', 'Elite Service', 'Maternity', 'Surgery', 'Executive'],
      popular: false
    },
    {
      id: '84',
      name: 'Custodian Insurance',
      type: 'Custodian Health',
      monthlyPremium: '₦18,500',
      coverage: '₦7,000,000',
      rating: 4.3,
      features: ['Custodian Care', 'Protected Health', 'Maternity', 'Surgery', 'Investment'],
      popular: false
    },
    {
      id: '85',
      name: 'Regency Alliance Insurance',
      type: 'Alliance Insurance',
      monthlyPremium: '₦14,000',
      coverage: '₦4,800,000',
      rating: 3.9,
      features: ['Alliance Network', 'Regency Care', 'Maternity', 'Surgery', 'Partnership'],
      popular: false
    },
    {
      id: '86',
      name: 'Staco Insurance',
      type: 'Comprehensive Insurance',
      monthlyPremium: '₦11,800',
      coverage: '₦3,900,000',
      rating: 3.8,
      features: ['Comprehensive Care', 'Stable Coverage', 'Maternity', 'Emergency', 'Reliable'],
      popular: false
    },
    {
      id: '87',
      name: 'Linkage Assurance',
      type: 'Network Insurance',
      monthlyPremium: '₦13,200',
      coverage: '₦4,400,000',
      rating: 3.9,
      features: ['Network Care', 'Connected Health', 'Maternity', 'Surgery', 'Partnership'],
      popular: false
    },
    {
      id: '88',
      name: 'Wapic Insurance',
      type: 'Pan-African Insurance',
      monthlyPremium: '₦15,800',
      coverage: '₦5,600,000',
      rating: 4.1,
      features: ['Pan-African', 'International Care', 'Maternity', 'Surgery', 'Cross-border'],
      popular: false
    },
    {
      id: '89',
      name: 'IGI Insurance',
      type: 'International Insurance',
      monthlyPremium: '₦16,800',
      coverage: '₦6,000,000',
      rating: 4.0,
      features: ['International Coverage', 'Global Care', 'Maternity', 'Surgery', 'Worldwide'],
      popular: false
    },
    {
      id: '90',
      name: 'Zenith General Insurance',
      type: 'General Insurance',
      monthlyPremium: '₦14,500',
      coverage: '₦4,900,000',
      rating: 4.0,
      features: ['General Coverage', 'Zenith Care', 'Maternity', 'Surgery', 'Comprehensive'],
      popular: false
    },
    // Microinsurance and Community-based
    {
      id: '91',
      name: 'Aiico Micro Insurance',
      type: 'Micro Insurance',
      monthlyPremium: '₦2,500',
      coverage: '₦350,000',
      rating: 3.5,
      features: ['Micro Coverage', 'Affordable Care', 'Basic Maternity', 'Emergency', 'Community'],
      popular: false
    },
    {
      id: '92',
      name: 'Access Bank Health Insurance',
      type: 'Banking Health',
      monthlyPremium: '₦8,000',
      coverage: '₦2,500,000',
      rating: 3.7,
      features: ['Banking Integration', 'Digital Health', 'Maternity', 'Emergency', 'Mobile'],
      popular: false
    },
    {
      id: '93',
      name: 'First Bank Health Plan',
      type: 'Banking Health',
      monthlyPremium: '₦8,500',
      coverage: '₦2,800,000',
      rating: 3.8,
      features: ['Banking Network', 'Traditional Care', 'Maternity', 'Emergency', 'Heritage'],
      popular: false
    },
    {
      id: '94',
      name: 'GTBank Health Insurance',
      type: 'Banking Health',
      monthlyPremium: '₦9,200',
      coverage: '₦3,000,000',
      rating: 3.9,
      features: ['Banking Excellence', 'Digital Health', 'Maternity', 'Emergency', 'Innovation'],
      popular: false
    },
    {
      id: '95',
      name: 'UBA Health Cover',
      type: 'Banking Health',
      monthlyPremium: '₦8,800',
      coverage: '₦2,900,000',
      rating: 3.8,
      features: ['Pan-African Banking', 'Cross-border Care', 'Maternity', 'Emergency', 'Regional'],
      popular: false
    },
    {
      id: '96',
      name: 'Zenith Bank Health Plan',
      type: 'Banking Health',
      monthlyPremium: '₦9,500',
      coverage: '₦3,100,000',
      rating: 3.9,
      features: ['Banking Excellence', 'Premium Banking', 'Maternity', 'Emergency', 'Elite'],
      popular: false
    },
    {
      id: '97',
      name: 'Fidelity Health Insurance',
      type: 'Banking Health',
      monthlyPremium: '₦8,200',
      coverage: '₦2,600,000',
      rating: 3.7,
      features: ['Fidelity Network', 'Reliable Care', 'Maternity', 'Emergency', 'Trust'],
      popular: false
    },
    {
      id: '98',
      name: 'Unity Bank Health Cover',
      type: 'Banking Health',
      monthlyPremium: '₦7,500',
      coverage: '₦2,300,000',
      rating: 3.6,
      features: ['Unity Network', 'Community Banking', 'Maternity', 'Emergency', 'Grassroots'],
      popular: false
    },
    {
      id: '99',
      name: 'Cooperative Health Insurance',
      type: 'Cooperative Health',
      monthlyPremium: '₦6,000',
      coverage: '₦1,800,000',
      rating: 3.4,
      features: ['Cooperative Model', 'Community Care', 'Basic Maternity', 'Emergency', 'Affordable'],
      popular: false
    },
    {
      id: '100',
      name: 'Federal Civil Service Health Insurance',
      type: 'Civil Service Health',
      monthlyPremium: '₦5,500',
      coverage: '₦1,500,000',
      rating: 3.3,
      features: ['Civil Service', 'Government Workers', 'Basic Maternity', 'Emergency', 'Subsidized'],
      popular: false
    },
    {
      id: '101',
      name: 'Teachers Health Insurance Scheme',
      type: 'Professional Health',
      monthlyPremium: '₦4,800',
      coverage: '₦1,200,000',
      rating: 3.2,
      features: ['Teachers Focus', 'Education Sector', 'Basic Maternity', 'Emergency', 'Affordable'],
      popular: false
    },
    {
      id: '102',
      name: 'Agricultural Insurance Corporation Health',
      type: 'Agricultural Health',
      monthlyPremium: '₦4,200',
      coverage: '₦1,000,000',
      rating: 3.1,
      features: ['Agricultural Focus', 'Rural Coverage', 'Basic Maternity', 'Emergency', 'Farmers'],
      popular: false
    },
    {
      id: '103',
      name: 'Oil & Gas Workers Health Plan',
      type: 'Industry Health',
      monthlyPremium: '₦22,000',
      coverage: '₦9,500,000',
      rating: 4.4,
      features: ['Oil & Gas Industry', 'High-risk Coverage', 'Comprehensive Maternity', 'Emergency', 'International'],
      popular: false
    },
    {
      id: '104',
      name: 'Mining Industry Health Insurance',
      type: 'Industry Health',
      monthlyPremium: '₦18,000',
      coverage: '₦7,000,000',
      rating: 4.1,
      features: ['Mining Industry', 'Occupational Health', 'Maternity', 'Emergency', 'Specialized'],
      popular: false
    },
    {
      id: '105',
      name: 'Maritime Workers Health Plan',
      type: 'Maritime Health',
      monthlyPremium: '₦19,500',
      coverage: '₦7,800,000',
      rating: 4.2,
      features: ['Maritime Industry', 'Offshore Coverage', 'Maternity', 'Emergency', 'International'],
      popular: false
    },
    {
      id: '106',
      name: 'Aviation Industry Health Insurance',
      type: 'Aviation Health',
      monthlyPremium: '₦21,000',
      coverage: '₦8,800,000',
      rating: 4.3,
      features: ['Aviation Industry', 'Flight Crew Coverage', 'Maternity', 'Emergency', 'International'],
      popular: false
    },
    {
      id: '107',
      name: 'Telecommunications Health Plan',
      type: 'Tech Health',
      monthlyPremium: '₦16,000',
      coverage: '₦5,800,000',
      rating: 4.0,
      features: ['Tech Industry', 'Digital Health', 'Maternity', 'Emergency', 'Innovation'],
      popular: false
    },
    {
      id: '108',
      name: 'Manufacturing Workers Health Insurance',
      type: 'Manufacturing Health',
      monthlyPremium: '₦14,500',
      coverage: '₦4,900,000',
      rating: 3.9,
      features: ['Manufacturing Focus', 'Industrial Health', 'Maternity', 'Emergency', 'Occupational'],
      popular: false
    }
  ];

  const filteredPlans = insurancePlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const price = parseInt(plan.monthlyPremium.replace(/[₦,]/g, ''));
    const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
    
    const coverage = parseInt(plan.coverage.replace(/[₦,]/g, ''));
    const matchesCoverage = filters.coverage === 'all' || coverage >= parseInt(filters.coverage);
    
    const matchesType = filters.type === 'all' || 
                       (filters.type === 'hmo' && plan.type.toLowerCase().includes('hmo')) ||
                       (filters.type === 'insurance' && !plan.type.toLowerCase().includes('hmo')) ||
                       (filters.type === 'family' && plan.type.toLowerCase().includes('family')) ||
                       (filters.type === 'premium' && plan.type.toLowerCase().includes('premium'));
    
    const matchesRating = plan.rating >= filters.rating;
    
    const matchesFeatures = filters.features.length === 0 || 
                           filters.features.every(feature => 
                             plan.features.some(planFeature => 
                               planFeature.toLowerCase().includes(feature.toLowerCase())
                             )
                           );

    return matchesSearch && matchesPrice && matchesCoverage && matchesType && matchesRating && matchesFeatures;
  });

  const sortedPlans = [...filteredPlans].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.monthlyPremium.replace(/[₦,]/g, '')) - parseInt(b.monthlyPremium.replace(/[₦,]/g, ''));
      case 'price-high':
        return parseInt(b.monthlyPremium.replace(/[₦,]/g, '')) - parseInt(a.monthlyPremium.replace(/[₦,]/g, ''));
      case 'rating':
        return b.rating - a.rating;
      case 'coverage':
        return parseInt(b.coverage.replace(/[₦,]/g, '')) - parseInt(a.coverage.replace(/[₦,]/g, ''));
      default:
        return b.popular ? 1 : -1;
    }
  });

  const handleAddToComparison = (plan: any) => {
    if (selectedForComparison.length < 3 && !selectedForComparison.find(p => p.id === plan.id)) {
      setSelectedForComparison([...selectedForComparison, plan]);
      setShowComparison(true);
    }
  };

  const handleRemoveFromComparison = (planId: string) => {
    setSelectedForComparison(selectedForComparison.filter(p => p.id !== planId));
  };

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentInitiate = (method: string, details: any) => {
    console.log('Payment initiated:', method, details);
    // Here you would integrate with actual payment processor
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Health Insurance Plans
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find the perfect health insurance plan for you and your family, with special focus on maternal care
            </p>
            
            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search insurance providers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center"
              >
                <Scale className="h-4 w-4 mr-2" />
                Compare ({selectedForComparison.length})
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="col-span-12 lg:col-span-3">
                <InsuranceFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={() => setFilters({
                    priceRange: [1000, 50000],
                    coverage: 'all',
                    type: 'all',
                    features: [],
                    rating: 0
                  })}
                />
              </div>
            )}

            {/* Main Content */}
            <div className={`col-span-12 ${showFilters ? 'lg:col-span-9' : ''}`}>
              {/* Sort Controls */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing {sortedPlans.length} of {insurancePlans.length} plans
                </p>
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="coverage">Highest Coverage</option>
                  </select>
                </div>
              </div>

              {/* Comparison Panel */}
              {showComparison && (
                <div className="mb-6">
                  <InsuranceComparison
                    selectedPlans={selectedForComparison}
                    onRemovePlan={handleRemoveFromComparison}
                    onClearComparison={() => {
                      setSelectedForComparison([]);
                      setShowComparison(false);
                    }}
                  />
                </div>
              )}

              {/* Insurance Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {sortedPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-lg transition-shadow relative border-l-4 border-l-teal-500">
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-4 bg-emerald-600">
                        Most Popular
                      </Badge>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Shield className="h-8 w-8 text-teal-600" />
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{plan.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <p className="text-sm text-gray-600">{plan.type}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-teal-600">{plan.monthlyPremium}</div>
                        <div className="text-sm text-gray-600">per month</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-600">Coverage up to</div>
                        <div className="text-lg font-semibold">{plan.coverage}</div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {plan.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                          {plan.features.length > 3 && (
                            <li className="text-sm text-gray-500">
                              +{plan.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-teal-600 hover:bg-teal-700"
                          onClick={() => handleSelectPlan(plan)}
                        >
                          Get Quote
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleAddToComparison(plan)}
                          disabled={selectedForComparison.length >= 3 || selectedForComparison.find(p => p.id === plan.id)}
                        >
                          {selectedForComparison.find(p => p.id === plan.id) ? 'Added to Compare' : 'Compare'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Payment Modal */}
              {showPayment && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Complete Your Purchase</h2>
                      <Button variant="ghost" onClick={() => setShowPayment(false)}>×</Button>
                    </div>
                    <div className="p-4">
                      <PaymentMethods
                        selectedPlan={selectedPlan}
                        onPaymentInitiate={handlePaymentInitiate}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help Choosing the Right Plan?
              </h2>
              <p className="text-gray-600 mb-6">
                Our healthcare experts are here to help you find the perfect insurance plan for your maternal care needs
              </p>
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Speak with an Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
