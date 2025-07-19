import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, TestTube, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

const BookLabTest = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLab, setSelectedLab] = useState('');
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [collectionMethod, setCollectionMethod] = useState('lab_visit');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
  ];

  const labs = [
    { id: '1', name: 'Lagos Diagnostic Centre', address: 'Victoria Island, Lagos', rating: 4.8 },
    { id: '2', name: 'Abuja Medical Laboratory', address: 'Wuse 2, Abuja', rating: 4.6 },
    { id: '3', name: 'Synlab Nigeria', address: 'Ikeja, Lagos', rating: 4.7 },
    { id: '4', name: 'Bridge Clinic Laboratory', address: 'Ikoyi, Lagos', rating: 4.9 }
  ];

  const availableTests = [
    { id: '1', name: 'Full Blood Count (FBC)', price: 8500, category: 'Hematology' },
    { id: '2', name: 'Lipid Profile', price: 12000, category: 'Biochemistry' },
    { id: '3', name: 'Liver Function Test', price: 15000, category: 'Biochemistry' },
    { id: '4', name: 'Thyroid Function Test', price: 18000, category: 'Endocrinology' },
    { id: '5', name: 'Malaria Parasite Test', price: 3500, category: 'Parasitology' },
    { id: '6', name: 'HIV Screening', price: 5000, category: 'Serology' },
    { id: '7', name: 'Hepatitis B Surface Antigen', price: 6500, category: 'Serology' },
    { id: '8', name: 'Blood Sugar (Fasting)', price: 4000, category: 'Biochemistry' }
  ];

  const handleTestSelection = (testId: string, checked: boolean) => {
    if (checked) {
      setSelectedTests([...selectedTests, testId]);
    } else {
      setSelectedTests(selectedTests.filter(id => id !== testId));
    }
  };

  const calculateTotal = () => {
    return selectedTests.reduce((total, testId) => {
      const test = availableTests.find(t => t.id === testId);
      return total + (test?.price || 0);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Lab Test Booked!",
        description: `Your lab tests have been scheduled for ${format(selectedDate!, 'PPP')} at ${selectedTime}`,
      });

      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setSelectedLab('');
      setSelectedTests([]);
      setPatientName('');
      setPatientAge('');
      setSpecialInstructions('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book lab tests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout title="Book Lab Test" showBreadcrumbs={true}>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TestTube className="h-6 w-6 mr-2 text-teal-600" />
              Schedule Lab Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="patientAge">Patient Age</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="Enter age"
                    min="1"
                    max="120"
                    required
                  />
                </div>
              </div>

              {/* Lab Selection */}
              <div>
                <Label htmlFor="lab">Select Laboratory</Label>
                <Select value={selectedLab} onValueChange={setSelectedLab}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a laboratory" />
                  </SelectTrigger>
                  <SelectContent>
                    {labs.map((lab) => (
                      <SelectItem key={lab.id} value={lab.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{lab.name}</span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {lab.address} • Rating: {lab.rating}/5
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Test Selection */}
              <div>
                <Label>Select Tests</Label>
                <div className="mt-2 space-y-3 max-h-60 overflow-y-auto border rounded-md p-4">
                  {availableTests.map((test) => (
                    <div key={test.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={test.id}
                        checked={selectedTests.includes(test.id)}
                        onCheckedChange={(checked) => handleTestSelection(test.id, !!checked)}
                      />
                      <Label htmlFor={test.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{test.name}</span>
                            <span className="text-sm text-gray-500 ml-2">({test.category})</span>
                          </div>
                          <span className="font-medium text-teal-600">₦{test.price.toLocaleString()}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collection Method */}
              <div>
                <Label>Collection Method</Label>
                <Select value={collectionMethod} onValueChange={setCollectionMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab_visit">Visit Laboratory</SelectItem>
                    <SelectItem value="home_collection">Home Collection (+₦5,000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Collection Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special instructions or notes..."
                  rows={3}
                />
              </div>

              {/* Total Cost */}
              {selectedTests.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Cost:</span>
                    <span className="text-xl font-bold text-teal-600">
                      ₦{(calculateTotal() + (collectionMethod === 'home_collection' ? 5000 : 0)).toLocaleString()}
                    </span>
                  </div>
                  {collectionMethod === 'home_collection' && (
                    <p className="text-sm text-gray-600 mt-1">Includes ₦5,000 home collection fee</p>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!selectedDate || !selectedTime || !selectedLab || selectedTests.length === 0 || !patientName || !patientAge || isLoading}
              >
                {isLoading ? 'Booking...' : `Book Lab Tests (₦${(calculateTotal() + (collectionMethod === 'home_collection' ? 5000 : 0)).toLocaleString()})`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default BookLabTest;