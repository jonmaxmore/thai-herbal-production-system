
// Streamlined types for the lite herb traceability platform
export type UserId = string;
export type FarmerId = string;
export type HerbId = string;
export type TraceId = string;
export type CertificationId = string;

// Simplified process status
export type ProcessStatus = "Pending" | "In Progress" | "Passed" | "Failed" | "Expired";

// Core inspection processes - GACP is primary, others are optional
export type InspectionProcess = "GACP Certification" | "EU-GMP Certification" | "DTTM Certification" | "TIS Certification" | "Quality Control";

// GACP Application Status - Primary certification workflow
export type GACPApplicationStatus = "Draft" | "Submitted" | "Under Review" | "Pre-Approved" | "Rejected" | "Site Inspection Scheduled" | "Site Inspection Complete" | "Approved" | "Certificate Issued";

// Optional certification status - simpler workflow
export type OptionalCertificationStatus = "Not Applied" | "Applied" | "Approved" | "Rejected" | "Expired";

// Marketplace transaction type (added to fix missing type error)
export interface MarketplaceTransaction {
  id: string;
  userId: string;
  timestamp: Date;
  amount: number;
  productName: string;
  quantity: number;
  status: "Completed" | "Pending" | "Failed";
  paymentMethod: string;
}

// Individual Plant Tracking - New QR Code System
export interface PlantData {
  id: string;
  qrCode: string;
  parentPlantId?: string; // For tracking mother plants
  seedSource?: string;
  plantingDate: Date;
  farmId: string;
  herbId: string;
  status: "Seedling" | "Growing" | "Mature" | "Harvested" | "Lab Testing" | "Packaged";
  currentLocation: {
    lat: number;
    lng: number;
    facilityType: "Farm" | "Lab" | "Processing" | "Warehouse";
  };
  growthStages: PlantGrowthStage[];
  labResults?: LabResult[];
}

export interface PlantGrowthStage {
  id: string;
  plantId: string;
  stage: "Seeding" | "Germination" | "Vegetative" | "Flowering" | "Harvesting";
  date: Date;
  photos?: string[];
  notes?: string;
  environmentalConditions?: {
    temperature: number;
    humidity: number;
    soilPh: number;
  };
}

export interface LabResult {
  id: string;
  plantId: string;
  testDate: Date;
  testType: "Quality Control" | "Contamination" | "Potency" | "Heavy Metals";
  results: Record<string, any>;
  passed: boolean;
  certifiedBy: string;
}

// Package Level Tracking
export interface PackageData {
  id: string;
  qrCode: string;
  packageType: "Dried Herbs" | "Extract" | "Powder" | "Capsules";
  plantIds: string[]; // Array of individual plant IDs in this package
  totalWeight: number;
  packageDate: Date;
  expiryDate: Date;
  batchNumber: string;
  qualityGrade: "A" | "B" | "C" | "Premium";
  packagedBy: string;
  destinationInfo?: {
    retailer?: string;
    distributorId?: string;
    exportCountry?: string;
  };
}

// Streamlined Herb type
export interface HerbData {
  id: string;
  name: string;
  farmerId: string;
  category: "cannabis" | "traditional";
  thcContent?: number;
  cbdContent?: number;
  properties: string[];
}

// Updated Farm type with GACP as primary and others as optional
export interface EnhancedFarm {
  id: string;
  name: string;
  herb: string;
  userId: UserId;
  // Primary certification (required)
  gacp: ProcessStatus;
  gacpCertificateNumber?: string;
  gacpExpiryDate?: string;
  
  // Optional certifications (can be farmer-entered or API-integrated)
  optionalCertifications?: {
    euGmp?: OptionalCertificationStatus;
    euGmpCertificateNumber?: string;
    euGmpExpiryDate?: string;
    euGmpSource?: "farmer_entered" | "ministry_api";
    
    dttm?: OptionalCertificationStatus;
    dttmCertificateNumber?: string;
    dttmExpiryDate?: string;
    dttmSource?: "farmer_entered" | "ministry_api";
    
    tis?: OptionalCertificationStatus;
    tisCertificateNumber?: string;
    tisExpiryDate?: string;
    tisSource?: "farmer_entered" | "ministry_api";
  };
  
  location: {
    lat: number;
    lng: number;
  };
  owner: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  province: string;
  organicCertified: boolean;
  lastInspectionDate: string;
  cultivationArea: number;
  registrationNumber?: string;
  establishedYear?: number;
  nextInspectionDate?: string;
}

// Enhanced Trace type for individual plant tracking
export interface EnhancedTrace {
  id: string;
  herbId: string;
  herb: string;
  event: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  farmId: string;
  batchNumber: string;
  quantity: number;
  unit: string;
  qualityGrade: "A" | "B" | "C" | "Premium";
  verifiedBy: string;
  certifications: string[];
  temperature?: number;
  humidity?: number;
  moistureLevel?: number;
  notes?: string;
  referenceCode?: string;
  herbName?: string;
  // New fields for individual plant tracking
  plantId?: string;
  packageId?: string;
  relatedPlantIds?: string[]; // For package-level traces
}

// Simplified Transaction type
export interface EnhancedTransaction {
  id: string;
  userId: string;
  timestamp: Date;
  amount: number;
  productName: string;
  quantity: number;
  status: "Completed" | "Pending" | "Failed";
  paymentMethod: string;
  herbId: HerbId;
}

// GACP Application Interface - Primary certification workflow
export interface GACPApplication {
  id: string;
  farmerId: FarmerId;
  userId: UserId;
  status: GACPApplicationStatus;
  submittedDate?: Date;
  farmData: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    province: string;
    cultivationArea: number;
    crops: string[];
    farmImages: string[];
  };
  labResults: {
    files: string[];
    uploadDate?: Date;
  };
  preApprovalData?: {
    aiAnalysisResult: string;
    videoCallDate?: Date;
    videoCallStatus?: "Scheduled" | "Completed" | "Failed";
    preApprovalResult?: "Approved" | "Rejected";
    rejectionReason?: string;
  };
  siteInspection?: {
    scheduledDate?: Date;
    inspectors: string[];
    inspectionResult?: "Passed" | "Failed";
    notes?: string;
  };
  certificateData?: {
    certificateNumber?: string;
    issueDate?: Date;
    expiryDate?: Date;
    certificateFile?: string;
  };
}

// Optional Certification Application - Simplified workflow for optional certs
export interface OptionalCertificationApplication {
  id: string;
  farmerId: FarmerId;
  certificationType: "EU-GMP" | "DTTM" | "TIS";
  status: OptionalCertificationStatus;
  submittedDate?: Date;
  source: "farmer_entered" | "ministry_api";
  certificateNumber?: string;
  issueDate?: Date;
  expiryDate?: Date;
  documentFile?: string;
  apiSyncData?: {
    lastSyncDate: Date;
    ministryApiEndpoint: string;
    syncStatus: "success" | "failed" | "pending";
  };
}

// Add inspection process interface with all required properties
export interface InspectionProcessData {
  id: string;
  farmerId: string;
  herbId: string;
  herbName: string;
  processType: InspectionProcess;
  status: ProcessStatus;
  startDate: Date;
  completionDate?: Date;
  inspectorName?: string;
  farmerName?: string;
  isPrimary?: boolean; // True for GACP, false for optional certs
}

// Stakeholder data types
export interface StakeholderData {
  role: string;
  count: number;
}

export interface InvolvementData {
  status: string;
  count: number;
  category: string; // Add missing category field
}
