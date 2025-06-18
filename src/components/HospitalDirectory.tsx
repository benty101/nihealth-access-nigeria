
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Phone, Mail, Building2, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hospitalService, type Hospital } from '@/services/HospitalService';
import { useToast } from '@/hooks/use-toast';

const HospitalDirectory = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  const hospitalsPerPage = 12;

  useEffect(() => {
    loadHospitals();
    
    // Setup realtime subscription for public hospital directory
    const unsubscribe = hospitalService.subscribeToHospitalChanges({
      onInsert: (hospital) => {
        if (hospital.is_active) {
          setHospitals(prev => [hospital, ...prev]);
        }
      },
      onUpdate: (hospital) => {
        setHospitals(prev => prev.map(h => h.id === hospital.id ? hospital : h));
      },
      onDelete: (hospital) => {
        setHospitals(prev => prev.filter(h => h.id !== hospital.id));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    filterHospitals();
  }, [hospitals, searchTerm, selectedState, selectedSpecialty]);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      const hospitalsData = await hospitalService.getAllHospitals();
      setHospitals(hospitalsData);
    } catch (error) {
      console.error('Error loading hospitals:', error);
      toast({
        title: "Error",
        description: "Failed to load hospitals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterHospitals = async () => {
    try {
      if (!searchTerm && !selectedState && !selectedSpecialty) {
        setFilteredHospitals(hospitals);
        return;
      }

      const results = await hospitalService.searchHospitals(searchTerm, {
        state: selectedState || undefined,
        specialty: selectedSpecialty || undefined
      });
      
      setFilteredHospitals(results);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error filtering hospitals:', error);
      setFilteredHospitals(hospitals);
    }
  };

  const getAllStates = () => {
    const states = hospitals.map(h => h.state).filter(Boolean);
    return [...new Set(states)].sort();
  };

  const getAllSpecialties = () => {
    const specialties = hospitals.flatMap(h => h.specialties || []);
    return [...new Set(specialties)].sort();
  };

  const getCurrentPageHospitals = () => {
    const startIndex = (currentPage - 1) * hospitalsPerPage;
    const endIndex = startIndex + hospitalsPerPage;
    return filteredHospitals.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading hospitals...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hospital Directory</h1>
          <p className="text-xl text-gray-600">Find quality healthcare providers near you</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {filteredHospitals.length} hospitals available
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Live updates
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Hospitals</span>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search hospitals by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={filterHospitals}>Search</Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {getAllStates().map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specialties</SelectItem>
                    {getAllSpecialties().map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {Math.min((currentPage - 1) * hospitalsPerPage + 1, filteredHospitals.length)} - {Math.min(currentPage * hospitalsPerPage, filteredHospitals.length)} of {filteredHospitals.length} hospitals
          </p>
        </div>

        {/* Hospital Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getCurrentPageHospitals().map((hospital) => (
            <Card key={hospital.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-teal-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {hospital.name}
                  </CardTitle>
                  <div className="flex flex-col gap-1">
                    {hospital.license_number && (
                      <Badge variant="outline" className="text-xs">
                        {hospital.license_number}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div>{hospital.address || 'Address not provided'}</div>
                    <div>{hospital.lga && hospital.state ? `${hospital.lga}, ${hospital.state}` : hospital.state || 'Location not specified'}</div>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  {hospital.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{hospital.phone}</span>
                    </div>
                  )}
                  {hospital.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{hospital.email}</span>
                    </div>
                  )}
                </div>

                {/* Specialties */}
                {hospital.specialties && hospital.specialties.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {hospital.specialties.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hospital.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Key Facilities */}
                {hospital.facilities && hospital.facilities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Facilities</h4>
                    <div className="flex flex-wrap gap-1">
                      {hospital.facilities.slice(0, 2).map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                      {hospital.facilities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{hospital.facilities.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                    Book Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "bg-teal-600 hover:bg-teal-700" : ""}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {filteredHospitals.length === 0 && (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hospitals found matching your criteria</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedState('');
                setSelectedSpecialty('');
              }}
              className="mt-4"
              variant="outline"
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
