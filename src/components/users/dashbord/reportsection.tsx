import AddReportModal from "@/components/ui/addDetail";
import ReportModal from "@/components/ui/report";
import { useFetchreport } from "@/lib/Query/hooks/useReport";
import { useAppSelector } from "@/lib/store/hooks";
import { Button, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { MdRefresh } from "react-icons/md";
type Report = {
  _id: string;
  User: string;
  report: string;
  healthstatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

function Reportsection() {
  const { user } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { reports,refetch } = useFetchreport(user?.id ?? "");

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case " 🟢 ":
        return "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500";
      case " 🟡 ":
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500";
      case " 🔴 ":
        return "bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-red-500";
      case " ⚠️ ":
        return "bg-gradient-to-r from-red-100 to-red-200 border-l-4 border-red-600";
      default:
        return "bg-gray-100 border-l-4 border-gray-400";
    }
  };

  return (
    <>
      <Card className="shadow-lg rounded-xl overflow-hidden border-t-4 border-teal-400">
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-teal-50 to-white">
          <div className="flex justify-start">
            <h3 className="text-lg font-semibold text-gray-500 flex items-center">
              <MedicalServicesIcon className="mr-2" fontSize="small" />
              Medical Reports
              
            </h3>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Report
            </Button>
            <MdRefresh  size={29} className="text-teal-500" onClick={()=>refetch()}/>
          </div>
        </div>
        <CardContent className="space-y-3 max-h-48 overflow-y-auto scrollbar-none p-4">
          {reports.length > 0 ? (
            reports
              .slice()
              .sort(
                (a: Report, b: Report) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((reportItem: Report) => {
                return (
                  reportItem.healthstatus && (
                    <div
                      key={reportItem._id}
                      className={`rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition-all ${getStatusColor(
                        reportItem.healthstatus
                      )}`}
                      onClick={() => handleReportClick(reportItem)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">
                          {"Report of " +
                            new Date(reportItem.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs bg-white/70 rounded-full px-2 py-1 shadow-sm">
                          {new Date(reportItem.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )
                );
              })
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <MedicalServicesIcon
                style={{ fontSize: 40 }}
                className="text-gray-300 mb-2"
              />
              
              <Button
                variant="text"
                size="small"
                color="primary"
                className="mt-2"
                onClick={() => setIsModalOpen(true)}
              >
                Create your first report
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <AddReportModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ReportModal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={selectedReport}
      />
    </>
  );
}

export default Reportsection;
