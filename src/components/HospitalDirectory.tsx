
import React, { useState, useEffect } from 'react';
import { Stethoscope } from 'lucide-react';
import HospitalStats from './HospitalStats';
import HospitalSearchFilters from './HospitalSearchFilters';
import HospitalCard from './HospitalCard';
import { hospitalService, type Hospital } from '@/services/HospitalService';
import { useToast } from '@/hooks/use-toast';

const HospitalDirectory = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const data = await hospitalService.getAllHospitals();
        setHospitals(data);
      } catch (error) {
        console.error("Failed to fetch hospitals", error);
        toast({
          title: "Error",
          description: "Could not load hospitals. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, [toast]);

  const filteredHospitals = hospitals.filter(hospital =>
    (selectedState === 'All' || hospital.state === selectedState) &&
    (selectedSpecialty === 'All' || (hospital.specialties && hospital.specialties.includes(selectedSpecialty))) &&
    (hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (hospital.address && hospital.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (hospital.specialties && hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))))
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HospitalStats />

        <HospitalSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          filteredCount={filteredHospitals.length}
        />

        {loading ? (
          <div className="text-center py-12">
            <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Loading hospitals...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </div>

            {filteredHospitals.length === 0 && (
              <div className="text-center py-12">
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HospitalDirectory;
