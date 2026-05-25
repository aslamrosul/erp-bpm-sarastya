import { useState } from 'react';
import { Search, Upload, FileText, Image, File, Download, Eye, Trash2 } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'img' | 'other';
  size: string;
  uploadedBy: string;
  uploadDate: string;
  category: string;
}

const documents: Document[] = [
  {
    id: 1,
    name: 'Proposal_PT_Indo_Berkah.pdf',
    type: 'pdf',
    size: '2.4 MB',
    uploadedBy: 'Budi Santoso',
    uploadDate: '2026-05-01',
    category: 'Sales',
  },
  {
    id: 2,
    name: 'Company_Profile_2026.pdf',
    type: 'pdf',
    size: '5.1 MB',
    uploadedBy: 'Maya Anggraini',
    uploadDate: '2026-04-28',
    category: 'Marketing',
  },
  {
    id: 3,
    name: 'Budget_Q2_2026.xlsx',
    type: 'xls',
    size: '1.8 MB',
    uploadedBy: 'Siti Nurhaliza',
    uploadDate: '2026-04-25',
    category: 'Finance',
  },
  {
    id: 4,
    name: 'Contract_Template.docx',
    type: 'doc',
    size: '245 KB',
    uploadedBy: 'Rina Wijaya',
    uploadDate: '2026-04-20',
    category: 'HR',
  },
  {
    id: 5,
    name: 'Product_Catalog_2026.pdf',
    type: 'pdf',
    size: '8.3 MB',
    uploadedBy: 'Maya Anggraini',
    uploadDate: '2026-04-15',
    category: 'Marketing',
  },
  {
    id: 6,
    name: 'Meeting_Minutes_May.docx',
    type: 'doc',
    size: '156 KB',
    uploadedBy: 'Ahmad Fauzi',
    uploadDate: '2026-05-03',
    category: 'General',
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="w-8 h-8 text-red-500" />;
    case 'doc':
      return <FileText className="w-8 h-8 text-blue-500" />;
    case 'xls':
      return <FileText className="w-8 h-8 text-green-500" />;
    case 'img':
      return <Image className="w-8 h-8 text-purple-500" />;
    default:
      return <File className="w-8 h-8 text-gray-500" />;
  }
};

export default function TeamworkDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Teamwork</span>
        <span>/</span>
        <span className="text-foreground">Documents</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Team Documents</h1>
          <p className="text-sm text-muted-foreground">
            Kelola dan bagikan dokumen tim ({documents.length} dokumen)
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Dokumen
        </Button>
      </div>

      <Card>
        {/* Toolbar */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama dokumen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
          >
            <option value="all">Semua Kategori</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0">{getFileIcon(doc.type)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm mb-1 truncate">{doc.name}</h3>
                  <div className="text-xs text-muted-foreground">{doc.size}</div>
                </div>
              </div>

              <div className="space-y-2 mb-3 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Kategori:</span>
                  <Badge variant="info">{doc.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Upload by:</span>
                  <span>{doc.uploadedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tanggal:</span>
                  <span>{doc.uploadDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#7B2D8B] text-white rounded-lg text-xs hover:bg-[#6B1D7B] transition-colors">
                  <Eye className="w-3 h-3" />
                  Lihat
                </button>
                <button className="flex items-center justify-center gap-1 px-3 py-2 border border-border rounded-lg text-xs hover:bg-secondary transition-colors">
                  <Download className="w-3 h-3" />
                </button>
                <button className="flex items-center justify-center gap-1 px-3 py-2 border border-border rounded-lg text-xs hover:bg-secondary transition-colors text-red-600">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
