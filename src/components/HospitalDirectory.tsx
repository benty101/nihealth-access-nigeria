
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Star, Shield, Clock, Users, Award } from 'lucide-react';

const HospitalDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All States');

  const hospitals = [
    {
      name: 'Lagos University Teaching Hospital (LUTH)',
      location: 'Surulere, Lagos State',
      phone: '+234 1 805 8709',
      rating: 4.8,
      specialties: ['Maternal Care', 'NICU', 'Emergency', 'Surgery'],
      nhisAccepted: true,
      features: ['24/7 Emergency', 'World-Class NICU', 'Expert Obstetricians'],
      image: '/api/placeholder/400/300',
      distance: '2.3 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'University College Hospital (UCH) Ibadan',
      location: 'Ibadan, Oyo State',
      phone: '+234 2 241 3204',
      rating: 4.7,
      specialties: ['Maternal Care', 'Pediatrics', 'Oncology', 'Cardiology'],
      nhisAccepted: true,
      features: ['Premier Maternity Ward', 'Advanced Equipment', 'Research Facility'],
      image: '/api/placeholder/400/300',
      distance: '1.8 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'National Hospital Abuja',
      location: 'Central District, FCT Abuja',
      phone: '+234 9 461 2000',
      rating: 4.6,
      specialties: ['Maternal Care', 'Emergency', 'ICU', 'Specialist Care'],
      nhisAccepted: true,
      features: ['National Center of Excellence', 'Advanced ICU', 'Top Specialists'],
      image: '/api/placeholder/400/300',
      distance: '3.1 km',
      type: 'Federal Hospital'
    },
    {
      name: 'Ahmadu Bello University Teaching Hospital',
      location: 'Shika, Kaduna State',
      phone: '+234 69 550 085',
      rating: 4.5,
      specialties: ['Maternal Care', 'Pediatrics', 'Surgery', 'Internal Medicine'],
      nhisAccepted: true,
      features: ['Regional Medical Hub', 'Training Hospital', 'Affordable Care'],
      image: '/api/placeholder/400/300',
      distance: '4.2 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'University of Nigeria Teaching Hospital',
      location: 'Ituku-Ozalla, Enugu State',
      phone: '+234 42 255 327',
      rating: 4.4,
      specialties: ['Maternal Care', 'Neurosurgery', 'Cardiology', 'Oncology'],
      nhisAccepted: true,
      features: ['Advanced Neurosurgery Unit', 'Modern Equipment', 'Research Center'],
      image: '/api/placeholder/400/300',
      distance: '2.7 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'Obafemi Awolowo University Teaching Hospital',
      location: 'Ile-Ife, Osun State',
      phone: '+234 36 230 540',
      rating: 4.6,
      specialties: ['Maternal Care', 'Pediatrics', 'Orthopedics', 'Dermatology'],
      nhisAccepted: true,
      features: ['Comprehensive Maternity Services', 'Pediatric Excellence', 'Community Outreach'],
      image: '/api/placeholder/400/300',
      distance: '1.9 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'Federal Medical Centre Abeokuta',
      location: 'Abeokuta, Ogun State',
      phone: '+234 39 244 020',
      rating: 4.3,
      specialties: ['Maternal Care', 'Emergency', 'General Surgery', 'Radiology'],
      nhisAccepted: true,
      features: ['Emergency Services', 'Modern Radiology', 'Affordable Healthcare'],
      image: '/api/placeholder/400/300',
      distance: '3.5 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Owerri',
      location: 'Owerri, Imo State',
      phone: '+234 83 230 025',
      rating: 4.2,
      specialties: ['Maternal Care', 'Pediatrics', 'Internal Medicine', 'Surgery'],
      nhisAccepted: true,
      features: ['Quality Maternal Care', 'Pediatric Ward', 'Community Health'],
      image: '/api/placeholder/400/300',
      distance: '2.1 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Yenagoa',
      location: 'Yenagoa, Bayelsa State',
      phone: '+234 89 490 020',
      rating: 4.1,
      specialties: ['Maternal Care', 'Emergency', 'General Medicine', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Regional Healthcare Hub', 'Emergency Response', 'Community Focus'],
      image: '/api/placeholder/400/300',
      distance: '4.8 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Lokoja',
      location: 'Lokoja, Kogi State',
      phone: '+234 58 220 190',
      rating: 4.0,
      specialties: ['Maternal Care', 'Pediatrics', 'Orthopedics', 'Ophthalmology'],
      nhisAccepted: true,
      features: ['Comprehensive Services', 'Modern Facilities', 'Affordable Care'],
      image: '/api/placeholder/400/300',
      distance: '3.7 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Lagos State University Teaching Hospital',
      location: 'Ikeja, Lagos State',
      phone: '+234 1 700 5878',
      rating: 4.5,
      specialties: ['Maternal Care', 'Emergency', 'ICU', 'Specialist Care'],
      nhisAccepted: true,
      features: ['State-of-the-art Equipment', 'Expert Staff', '24/7 Services'],
      image: '/api/placeholder/400/300',
      distance: '1.5 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Irrua Specialist Teaching Hospital',
      location: 'Irrua, Edo State',
      phone: '+234 55 411 110',
      rating: 4.7,
      specialties: ['Maternal Care', 'Infectious Diseases', 'Research', 'Emergency'],
      nhisAccepted: true,
      features: ['Infectious Disease Center', 'Research Excellence', 'Community Health'],
      image: '/api/placeholder/400/300',
      distance: '2.8 km',
      type: 'Specialist Hospital'
    },
    {
      name: 'Federal Medical Centre Abakaliki',
      location: 'Abakaliki, Ebonyi State',
      phone: '+234 43 220 012',
      rating: 4.2,
      specialties: ['Maternal Care', 'Surgery', 'Internal Medicine', 'Pediatrics'],
      nhisAccepted: true,
      features: ['Regional Medical Center', 'Quality Surgery', 'Maternal Excellence'],
      image: '/api/placeholder/400/300',
      distance: '3.2 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Asaba',
      location: 'Asaba, Delta State',
      phone: '+234 56 280 155',
      rating: 4.1,
      specialties: ['Maternal Care', 'Emergency', 'Pediatrics', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Emergency Care', 'Pediatric Services', 'Community Outreach'],
      image: '/api/placeholder/400/300',
      distance: '4.1 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Umuahia',
      location: 'Umuahia, Abia State',
      phone: '+234 88 220 334',
      rating: 4.0,
      specialties: ['Maternal Care', 'General Surgery', 'Internal Medicine', 'Radiology'],
      nhisAccepted: true,
      features: ['Comprehensive Care', 'Modern Radiology', 'Affordable Services'],
      image: '/api/placeholder/400/300',
      distance: '3.9 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Jalingo',
      location: 'Jalingo, Taraba State',
      phone: '+234 79 223 456',
      rating: 3.9,
      specialties: ['Maternal Care', 'Emergency', 'General Medicine', 'Surgery'],
      nhisAccepted: true,
      features: ['Regional Healthcare', 'Emergency Services', 'Community Focus'],
      image: '/api/placeholder/400/300',
      distance: '5.2 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Keffi',
      location: 'Keffi, Nasarawa State',
      phone: '+234 47 300 123',
      rating: 4.1,
      specialties: ['Maternal Care', 'Pediatrics', 'Internal Medicine', 'Emergency'],
      nhisAccepted: true,
      features: ['Quality Pediatric Care', 'Emergency Response', 'Community Health'],
      image: '/api/placeholder/400/300',
      distance: '3.6 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Makurdi',
      location: 'Makurdi, Benue State',
      phone: '+234 44 534 020',
      rating: 4.2,
      specialties: ['Maternal Care', 'Surgery', 'Emergency', 'Radiology'],
      nhisAccepted: true,
      features: ['Surgical Excellence', 'Emergency Care', 'Modern Equipment'],
      image: '/api/placeholder/400/300',
      distance: '2.4 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Ido-Ekiti',
      location: 'Ido-Ekiti, Ekiti State',
      phone: '+234 30 250 089',
      rating: 4.0,
      specialties: ['Maternal Care', 'Pediatrics', 'General Medicine', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Community Healthcare', 'Pediatric Services', 'Affordable Care'],
      image: '/api/placeholder/400/300',
      distance: '4.3 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Gombe',
      location: 'Gombe, Gombe State',
      phone: '+234 72 221 045',
      rating: 4.1,
      specialties: ['Maternal Care', 'Emergency', 'Internal Medicine', 'Surgery'],
      nhisAccepted: true,
      features: ['Regional Center', 'Emergency Services', 'Quality Healthcare'],
      image: '/api/placeholder/400/300',
      distance: '3.8 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Nnamdi Azikiwe University Teaching Hospital',
      location: 'Nnewi, Anambra State',
      phone: '+234 46 460 937',
      rating: 4.4,
      specialties: ['Maternal Care', 'Cardiology', 'Neurosurgery', 'Oncology'],
      nhisAccepted: true,
      features: ['Cardiac Center', 'Neurosurgery Unit', 'Cancer Treatment'],
      image: '/api/placeholder/400/300',
      distance: '2.6 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'Federal Teaching Hospital Abakaliki',
      location: 'Abakaliki, Ebonyi State',
      phone: '+234 43 220 567',
      rating: 4.3,
      specialties: ['Maternal Care', 'Orthopedics', 'Surgery', 'Emergency'],
      nhisAccepted: true,
      features: ['Orthopedic Excellence', 'Surgical Services', 'Emergency Care'],
      image: '/api/placeholder/400/300',
      distance: '3.1 km',
      type: 'Federal Teaching Hospital'
    },
    {
      name: 'Federal Teaching Hospital Gombe',
      location: 'Gombe, Gombe State',
      phone: '+234 72 223 890',
      rating: 4.2,
      specialties: ['Maternal Care', 'Pediatrics', 'Internal Medicine', 'Radiology'],
      nhisAccepted: true,
      features: ['Pediatric Excellence', 'Modern Radiology', 'Quality Care'],
      image: '/api/placeholder/400/300',
      distance: '4.0 km',
      type: 'Federal Teaching Hospital'
    },
    {
      name: 'Bayero University Teaching Hospital',
      location: 'Kano, Kano State',
      phone: '+234 64 630 210',
      rating: 4.5,
      specialties: ['Maternal Care', 'Cardiology', 'Nephrology', 'Emergency'],
      nhisAccepted: true,
      features: ['Cardiac Services', 'Kidney Care', 'Emergency Medicine'],
      image: '/api/placeholder/400/300',
      distance: '2.9 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'University of Maiduguri Teaching Hospital',
      location: 'Maiduguri, Borno State',
      phone: '+234 76 232 123',
      rating: 4.1,
      specialties: ['Maternal Care', 'Emergency', 'Surgery', 'Internal Medicine'],
      nhisAccepted: true,
      features: ['Regional Healthcare Hub', 'Emergency Response', 'Surgical Services'],
      image: '/api/placeholder/400/300',
      distance: '3.7 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'University of Calabar Teaching Hospital',
      location: 'Calabar, Cross River State',
      phone: '+234 87 230 456',
      rating: 4.3,
      specialties: ['Maternal Care', 'Oncology', 'Cardiology', 'Pediatrics'],
      nhisAccepted: true,
      features: ['Cancer Treatment Center', 'Cardiac Care', 'Pediatric Excellence'],
      image: '/api/placeholder/400/300',
      distance: '2.8 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'University of Uyo Teaching Hospital',
      location: 'Uyo, Akwa Ibom State',
      phone: '+234 85 200 789',
      rating: 4.2,
      specialties: ['Maternal Care', 'Surgery', 'Emergency', 'Radiology'],
      nhisAccepted: true,
      features: ['Surgical Excellence', 'Emergency Services', 'Modern Imaging'],
      image: '/api/placeholder/400/300',
      distance: '3.4 km',
      type: 'Teaching Hospital'
    },
    {
      name: 'Federal Medical Centre Birnin Kebbi',
      location: 'Birnin Kebbi, Kebbi State',
      phone: '+234 68 320 145',
      rating: 3.9,
      specialties: ['Maternal Care', 'General Medicine', 'Pediatrics', 'Emergency'],
      nhisAccepted: true,
      features: ['Community Healthcare', 'Pediatric Services', 'Emergency Care'],
      image: '/api/placeholder/400/300',
      distance: '4.5 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Azare',
      location: 'Azare, Bauchi State',
      phone: '+234 77 540 234',
      rating: 4.0,
      specialties: ['Maternal Care', 'Internal Medicine', 'Surgery', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Internal Medicine Excellence', 'Surgical Services', 'Pharmacy Services'],
      image: '/api/placeholder/400/300',
      distance: '3.9 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Federal Medical Centre Nguru',
      location: 'Nguru, Yobe State',
      phone: '+234 71 410 567',
      rating: 3.8,
      specialties: ['Maternal Care', 'Emergency', 'General Medicine', 'Pediatrics'],
      nhisAccepted: true,
      features: ['Emergency Response', 'Community Health', 'Pediatric Care'],
      image: '/api/placeholder/400/300',
      distance: '5.1 km',
      type: 'Federal Medical Centre'
    },
    {
      name: 'Delta State University Teaching Hospital',
      location: 'Oghara, Delta State',
      phone: '+234 54 600 234',
      rating: 4.1,
      specialties: ['Maternal Care', 'Surgery', 'Internal Medicine', 'Emergency'],
      nhisAccepted: true,
      features: ['Teaching Excellence', 'Surgical Services', 'Emergency Care'],
      image: '/api/placeholder/400/300',
      distance: '3.6 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Ekiti State University Teaching Hospital',
      location: 'Ado-Ekiti, Ekiti State',
      phone: '+234 30 251 789',
      rating: 4.0,
      specialties: ['Maternal Care', 'Pediatrics', 'General Medicine', 'Surgery'],
      nhisAccepted: true,
      features: ['University Hospital', 'Pediatric Care', 'Community Focus'],
      image: '/api/placeholder/400/300',
      distance: '4.2 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Imo State University Teaching Hospital',
      location: 'Orlu, Imo State',
      phone: '+234 83 440 123',
      rating: 3.9,
      specialties: ['Maternal Care', 'Emergency', 'General Medicine', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Regional Healthcare', 'Emergency Services', 'Community Health'],
      image: '/api/placeholder/400/300',
      distance: '4.7 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Kogi State University Teaching Hospital',
      location: 'Anyigba, Kogi State',
      phone: '+234 58 400 456',
      rating: 3.8,
      specialties: ['Maternal Care', 'Pediatrics', 'Internal Medicine', 'Surgery'],
      nhisAccepted: true,
      features: ['Teaching Hospital', 'Pediatric Services', 'Medical Education'],
      image: '/api/placeholder/400/300',
      distance: '4.8 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Kwara State University Teaching Hospital',
      location: 'Ilorin, Kwara State',
      phone: '+234 31 740 234',
      rating: 4.0,
      specialties: ['Maternal Care', 'Surgery', 'Emergency', 'Radiology'],
      nhisAccepted: true,
      features: ['Surgical Excellence', 'Emergency Care', 'Modern Equipment'],
      image: '/api/placeholder/400/300',
      distance: '3.5 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Rivers State University Teaching Hospital',
      location: 'Port Harcourt, Rivers State',
      phone: '+234 84 230 567',
      rating: 4.2,
      specialties: ['Maternal Care', 'Cardiology', 'Neurology', 'Emergency'],
      nhisAccepted: true,
      features: ['Cardiac Center', 'Neurology Unit', 'Emergency Medicine'],
      image: '/api/placeholder/400/300',
      distance: '2.7 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Abia State University Teaching Hospital',
      location: 'Aba, Abia State',
      phone: '+234 82 440 789',
      rating: 3.9,
      specialties: ['Maternal Care', 'Pediatrics', 'Surgery', 'Internal Medicine'],
      nhisAccepted: true,
      features: ['Pediatric Excellence', 'Surgical Services', 'Community Health'],
      image: '/api/placeholder/400/300',
      distance: '4.1 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Adamawa State University Teaching Hospital',
      location: 'Mubi, Adamawa State',
      phone: '+234 75 550 234',
      rating: 3.8,
      specialties: ['Maternal Care', 'Emergency', 'General Medicine', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Regional Center', 'Emergency Response', 'Community Focus'],
      image: '/api/placeholder/400/300',
      distance: '5.0 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Akwa Ibom State University Teaching Hospital',
      location: 'Ikot Ekpene, Akwa Ibom State',
      phone: '+234 85 300 456',
      rating: 4.0,
      specialties: ['Maternal Care', 'Surgery', 'Pediatrics', 'Emergency'],
      nhisAccepted: true,
      features: ['Surgical Services', 'Pediatric Care', 'Emergency Medicine'],
      image: '/api/placeholder/400/300',
      distance: '3.8 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Bauchi State University Teaching Hospital',
      location: 'Gadau, Bauchi State',
      phone: '+234 77 650 123',
      rating: 3.7,
      specialties: ['Maternal Care', 'Internal Medicine', 'Emergency', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Internal Medicine', 'Emergency Services', 'Community Health'],
      image: '/api/placeholder/400/300',
      distance: '4.9 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Benue State University Teaching Hospital',
      location: 'Makurdi, Benue State',
      phone: '+234 44 320 789',
      rating: 3.9,
      specialties: ['Maternal Care', 'Surgery', 'Pediatrics', 'Radiology'],
      nhisAccepted: true,
      features: ['Surgical Excellence', 'Pediatric Services', 'Modern Imaging'],
      image: '/api/placeholder/400/300',
      distance: '4.3 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Cross River State University Teaching Hospital',
      location: 'Okuku, Cross River State',
      phone: '+234 87 440 234',
      rating: 3.8,
      specialties: ['Maternal Care', 'Emergency', 'General Medicine', 'Surgery'],
      nhisAccepted: true,
      features: ['Regional Healthcare', 'Emergency Care', 'Surgical Services'],
      image: '/api/placeholder/400/300',
      distance: '4.6 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Ebonyi State University Teaching Hospital',
      location: 'Abakaliki, Ebonyi State',
      phone: '+234 43 550 456',
      rating: 4.0,
      specialties: ['Maternal Care', 'Orthopedics', 'Surgery', 'Emergency'],
      nhisAccepted: true,
      features: ['Orthopedic Center', 'Surgical Excellence', 'Emergency Medicine'],
      image: '/api/placeholder/400/300',
      distance: '3.7 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Edo State University Teaching Hospital',
      location: 'Iyamho, Edo State',
      phone: '+234 52 330 567',
      rating: 3.9,
      specialties: ['Maternal Care', 'Pediatrics', 'Internal Medicine', 'Emergency'],
      nhisAccepted: true,
      features: ['Pediatric Excellence', 'Internal Medicine', 'Community Health'],
      image: '/api/placeholder/400/300',
      distance: '4.4 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Gombe State University Teaching Hospital',
      location: 'Gombe, Gombe State',
      phone: '+234 72 440 234',
      rating: 3.8,
      specialties: ['Maternal Care', 'Surgery', 'Emergency', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Regional Surgery', 'Emergency Response', 'Community Focus'],
      image: '/api/placeholder/400/300',
      distance: '4.8 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Jigawa State University Teaching Hospital',
      location: 'Kafin Hausa, Jigawa State',
      phone: '+234 64 850 123',
      rating: 3.7,
      specialties: ['Maternal Care', 'General Medicine', 'Pediatrics', 'Emergency'],
      nhisAccepted: true,
      features: ['Community Healthcare', 'Pediatric Services', 'Emergency Care'],
      image: '/api/placeholder/400/300',
      distance: '5.2 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Kaduna State University Teaching Hospital',
      location: 'Kaduna, Kaduna State',
      phone: '+234 62 330 789',
      rating: 4.1,
      specialties: ['Maternal Care', 'Cardiology', 'Surgery', 'Emergency'],
      nhisAccepted: true,
      features: ['Cardiac Services', 'Surgical Excellence', 'Emergency Medicine'],
      image: '/api/placeholder/400/300',
      distance: '3.2 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Katsina State University Teaching Hospital',
      location: 'Katsina, Katsina State',
      phone: '+234 65 440 456',
      rating: 3.9,
      specialties: ['Maternal Care', 'Internal Medicine', 'Pediatrics', 'Surgery'],
      nhisAccepted: true,
      features: ['Internal Medicine Excellence', 'Pediatric Care', 'Surgical Services'],
      image: '/api/placeholder/400/300',
      distance: '4.5 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Kebbi State University Teaching Hospital',
      location: 'Kalgo, Kebbi State',
      phone: '+234 68 550 234',
      rating: 3.6,
      specialties: ['Maternal Care', 'Emergency', 'General Medicine', 'Pharmacy'],
      nhisAccepted: true,
      features: ['Emergency Services', 'Community Health', 'Regional Center'],
      image: '/api/placeholder/400/300',
      distance: '5.5 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Niger State University Teaching Hospital',
      location: 'Minna, Niger State',
      phone: '+234 66 220 567',
      rating: 4.0,
      specialties: ['Maternal Care', 'Surgery', 'Emergency', 'Radiology'],
      nhisAccepted: true,
      features: ['Surgical Services', 'Emergency Care', 'Modern Radiology'],
      image: '/api/placeholder/400/300',
      distance: '3.9 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Plateau State University Teaching Hospital',
      location: 'Bokkos, Plateau State',
      phone: '+234 73 460 234',
      rating: 3.8,
      specialties: ['Maternal Care', 'Pediatrics', 'Internal Medicine', 'Emergency'],
      nhisAccepted: true,
      features: ['Pediatric Excellence', 'Internal Medicine', 'Community Focus'],
      image: '/api/placeholder/400/300',
      distance: '4.7 km',
      type: 'State Teaching Hospital'
    },
    {
      name: 'Sokoto State University Teaching Hospital',
      location: 'Sokoto, Sokoto State',
      phone: '+234 60 230 789',
      rating: 3.9,
      specialties: ['Maternal Care', 'Surgery', 'Emergency', 'General Medicine'],
      nhisAccepted: true,
      features: ['Regional Surgery Center', 'Emergency Response', 'Community Health'],
      image: '/api/placeholder/400/300',
      distance: '4.1 km',
      type: 'State Teaching Hospital'
    }
  ];

  const states = [
    'All States', 'Lagos State', 'Oyo State', 'FCT Abuja', 'Kaduna State',
    'Enugu State', 'Osun State', 'Ogun State', 'Imo State', 'Bayelsa State',
    'Kogi State', 'Edo State', 'Ebonyi State', 'Delta State', 'Abia State',
    'Taraba State', 'Nasarawa State', 'Benue State', 'Ekiti State',
    'Gombe State', 'Anambra State', 'Kano State', 'Borno State',
    'Cross River State', 'Akwa Ibom State', 'Kebbi State', 'Bauchi State',
    'Yobe State', 'Rivers State', 'Adamawa State', 'Jigawa State',
    'Katsina State', 'Niger State', 'Plateau State', 'Sokoto State',
    'Zamfara State', 'Kwara State'
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesState = selectedState === 'All States' || hospital.location.includes(selectedState);
    return matchesSearch && matchesState;
  });

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Hospital Directory</h1>
          <p className="text-lg text-gray-600 mb-6">
            Find verified hospitals with excellent maternal care services across Nigeria
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search hospitals, locations, or specialties..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-64">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-6">
            Showing {filteredHospitals.length} hospitals
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-teal-600" />
                    <Badge variant="secondary" className="text-xs">
                      {hospital.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{hospital.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{hospital.name}</CardTitle>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {hospital.location}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {hospital.phone}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {hospital.distance} away
                  </div>

                  {hospital.nhisAccepted && (
                    <div className="flex items-center">
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                        NHIS Accepted
                      </Badge>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {hospital.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2 pt-3">
                    <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">
                      Book Appointment
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No hospitals found matching your criteria</div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedState('All States');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDirectory;
