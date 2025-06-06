
import { useState } from "react";
import { Search, Filter, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import HerbTraceLayout from "@/components/layouts/HerbTraceLayout";
import { generateFarmers, CertificationStatus } from "@/utils/herbData";
import { Button } from "@/components/ui/button";
import AccessControl from "@/components/AccessControl";

export default function CertificationView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CertificationStatus | "All">("All");
  const [farmers] = useState(generateFarmers(100));

  // Filter farmers based on search term and status filter
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = searchTerm 
      ? farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        farmer.herb.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesStatus = statusFilter !== "All" 
      ? farmer.gapc === statusFilter || 
        farmer.euGmp === statusFilter || 
        farmer.dttm === statusFilter || 
        farmer.tis === statusFilter
      : true;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <HerbTraceLayout activeTab="certification">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold hidden md:block text-green-800">Certified Farmers</h2>
          
          <AccessControl page="certification" requiredPermission="approve">
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <PlusCircle className="h-4 w-4" />
              Review Pending Certifications
            </Button>
          </AccessControl>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
            <Input
              className="pl-10 border-green-200 focus:border-green-500"
              placeholder="Search farmers by name or herb..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-600" />
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as CertificationStatus | "All")}
            >
              <SelectTrigger className="w-[180px] border-green-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Passed">Passed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Herb</TableHead>
                    <TableHead>GACP</TableHead>
                    <TableHead>EU-GMP</TableHead>
                    <TableHead>DTTAM</TableHead>
                    <TableHead>TIS</TableHead>
                    <AccessControl page="certification" requiredPermission="edit">
                      <TableHead className="text-right">Actions</TableHead>
                    </AccessControl>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFarmers.map(farmer => (
                    <TableRow key={farmer.id} className="hover:bg-green-50">
                      <TableCell>{farmer.id}</TableCell>
                      <TableCell>{farmer.name}</TableCell>
                      <TableCell>{farmer.herb}</TableCell>
                      <TableCell><StatusBadge status={farmer.gapc} /></TableCell>
                      <TableCell><StatusBadge status={farmer.euGmp} /></TableCell>
                      <TableCell><StatusBadge status={farmer.dttm} /></TableCell>
                      <TableCell><StatusBadge status={farmer.tis} /></TableCell>
                      <AccessControl page="certification" requiredPermission="edit">
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            {farmer.gapc === "Pending" || farmer.euGmp === "Pending" || 
                             farmer.dttm === "Pending" || farmer.tis === "Pending" 
                              ? "Review" : "View"}
                          </Button>
                        </TableCell>
                      </AccessControl>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </HerbTraceLayout>
  );
}
