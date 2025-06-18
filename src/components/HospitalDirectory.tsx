
import React, { useState, useEffect } from 'react';
import { Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import HospitalSearchFilters from './hospitals/HospitalSearchFilters';
import EnhancedHospitalCard from './hospitals/EnhancedHospitalCard';
import { hospitalDataService, type Hospital, type HospitalFilters } from '@/services/HospitalDataService';
import { useToast } from '@/hooks/use-toast';

const HospitalDirectory = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState<HospitalFilters>({});
  const { toast } = useToast();

  const hospitalsPerPage = 12;

  const fetchHospitals = async (page = 1, newFilters = filters) => {
    try {
      setLoading(true);
      console.log('HospitalDirectory: Fetching hospitals for page:', page, 'with filters:', newFilters);
      
      const data = await hospitalDataService.getHospitals(newFilters, page, hospitalsPerPage);
      
      setHospitals(data.hospitals);
      setTotalCount(data.totalCount);
      setHasMore(data.hasMore);
      
      console.log('HospitalDirectory: Loaded hospitals:', {
        count: data.hospitals.length,
        totalCount: data.totalCount,
        hasMore: data.hasMore,
        currentPage: page
      });
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

  useEffect(() => {
    fetchHospitals(1, filters);
    setCurrentPage(1);
  }, [filters]);

  const handleFiltersChange = (newFilters: HospitalFilters) => {
    console.log('HospitalDirectory: Filters changed:', newFilters);
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchHospitals(page, filters);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (hospital: Hospital) => {
    console.log('View details for hospital:', hospital.name);
    // TODO: Implement hospital details modal or navigation
    toast({
      title: "Hospital Details",
      description: `Viewing details for ${hospital.name}`,
    });
  };

  const handleBookAppointment = (hospital: Hospital) => {
    console.log('Book appointment at hospital:', hospital.name);
    // TODO: Implement appointment booking
    toast({
      title: "Book Appointment",
      description: `Booking appointment at ${hospital.name}`,
    });
  };

  const totalPages = Math.ceil(totalCount / hospitalsPerPage);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HospitalSearchFilters
          onFiltersChange={handleFiltersChange}
          currentFilters={filters}
          isLoading={loading}
        />

        {loading ? (
          <div className="text-center py-12">
            <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Loading hospitals...</p>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {hospitals.length} of {totalCount} hospitals
                {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {hospitals.map((hospital) => (
                <EnhancedHospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onViewDetails={handleViewDetails}
                  onBookAppointment={handleBookAppointment}
                />
              ))}
            </div>

            {hospitals.length === 0 && (
              <div className="text-center py-12">
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {/* Show page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* Load More Button (alternative to pagination) */}
            {hasMore && totalPages <= 10 && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={loading}
                  variant="outline"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Stethoscope className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Hospitals'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HospitalDirectory;
