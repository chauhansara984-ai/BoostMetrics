export interface Service {
  id: string;
  name: string;
  category: 'SEO' | 'PPC' | 'Social Media' | 'Content' | 'Development' | 'Strategy';
  description: string;
  priceEstimate: number;
  benefits: string[];
  features: string[];
}

export interface PainPoint {
  challenge: string;
  solution: string;
  serviceId: string;
  impact: string;
  difficulty: 'Low' | 'Medium' | 'High';
}

export interface SwotItem {
  type: 'strength' | 'weakness' | 'opportunity' | 'threat';
  title: string;
  description: string;
  actionableStrategy: string;
}

export interface AuditReport {
  websiteUrl: string;
  seoScore: number;
  performanceScore: number;
  mobileFriendly: boolean;
  securityStatus: 'Secure' | 'Warning';
  issuesFound: string[];
  recommendations: string[];
}

export interface ProposalRequest {
  companyName: string;
  contactEmail: string;
  websiteUrl: string;
  monthlyBudget: number;
  targetAudience: string;
  selectedServices: string[];
}
