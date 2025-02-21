import React, { useEffect, useState } from "react";
import { Tabs, Descriptions, Button, Table } from "antd";
import profile from "../../Assets/unnamed.png";
import axios from "axios";
import { environment } from "../../environments/environment";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser = useSelector((state: any) => state.userAuth.currentUser.user);

  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${environment.apiPort}/employees/get-employee-profile`,
          {data: currentUser.employee_id}
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [currentUser.employee_id]);

  // Sample payslip data (to be used in place of an API call for now)
  const samplePayslipData = [
    {
      month: "January",
      year: 2025,
      fileName: "payslip_jan_2025.pdf",
    },
    {
      month: "February",
      year: 2025,
      fileName: "payslip_feb_2025.pdf",
    },
    {
      month: "March",
      year: 2025,
      fileName: "payslip_mar_2025.pdf",
    },
  ];

  const handleFileAction = (fileName: string, action: "view" | "download") => {
    const url = `${environment.apiPort}/${action}/${fileName}`;
    if (action === "view") {
      // Navigate to the payslip-template page
      navigate(`/home/payslip-template?file=${fileName}`);
    } else {
      axios
        .get(url, { responseType: "blob" })
        .then((response) => {
          const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = fileName;
          a.click();
        })
        .catch((error) => console.error(`Error ${action}ing file:`, error));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/5 bg-gray-200 p-4">
        <div className="bg-white m-6 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 max-w-lg mx-auto">
          <div className="flex justify-center mb-6">
            <div className="h-30 w-30 rounded-full border-8 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-1">
              <img
                src={userData?.profilePicture || profile}
                alt="Profile"
                className="h-30 w-30 object-cover rounded-full"
              />
            </div>
          </div>
          <h1 className="text-3xl text-indigo-800 font-bold mb-6 text-center">
            Profile Information
          </h1>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg text-indigo-600 font-medium"></span>
              <span className="text-lg text-gray-700 font-medium">{userData?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-indigo-600 font-medium"></span>
              <span className="text-lg text-gray-700 font-medium">{userData?.role}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-indigo-600 font-medium"></span>
              <span className="text-lg text-gray-700 font-medium">{userData?.department}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-indigo-600 font-medium"></span>
              <span className="text-lg text-gray-700 font-medium">{userData?.empId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-indigo-600 font-medium"></span>
              <span className="text-lg text-gray-700 font-medium">{userData?.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 p-4 bg-white mt-10 rounded-xl">
        <div className="m-3">
          <Tabs className="custom-tabs" tabBarStyle={{ borderBottom: "none" }}>
            <TabPane tab="Personal Details" key="1">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Employee Name">{userData?.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{userData?.email}</Descriptions.Item>
                <Descriptions.Item label="Mobile">{userData?.mobile}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{userData?.dob}</Descriptions.Item>
                <Descriptions.Item label="Gender">{userData?.gender}</Descriptions.Item>
                <Descriptions.Item label="Date of Joining">{userData?.joiningDate}</Descriptions.Item>
                <Descriptions.Item label="Blood Group">{userData?.bloodGroup}</Descriptions.Item>
                <Descriptions.Item label="Father's Name">{userData?.fatherName}</Descriptions.Item>
                <Descriptions.Item label="Alternate Number">{userData?.altNumber}</Descriptions.Item>
                <Descriptions.Item label="Aadhar Number">{userData?.aadhar}</Descriptions.Item>
                <Descriptions.Item label="Pan Number">{userData?.pan}</Descriptions.Item>
                <Descriptions.Item label="Emergency Contact Number">{userData?.emergencyContact}</Descriptions.Item>
                <Descriptions.Item label="Contact Person Name">{userData?.contactPersonName}</Descriptions.Item>
                <Descriptions.Item label="Contact Person Relationship">{userData?.contactPersonRelationship}</Descriptions.Item>
              </Descriptions>
            </TabPane>

            {/* Educational Details Tab */}
            <TabPane tab="Educational Details" key="2">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="10th Marks">{userData?.education?.tenthMarks}</Descriptions.Item>
                <Descriptions.Item label="12th/Diploma Marks">{userData?.education?.twelfthMarks}</Descriptions.Item>
                <Descriptions.Item label="UG Domain">{userData?.education?.ugDomain}</Descriptions.Item>
                <Descriptions.Item label="UG Year of Passing">{userData?.education?.ugYear}</Descriptions.Item>
                <Descriptions.Item label="PG Domain">{userData?.education?.pgDomain}</Descriptions.Item>
                <Descriptions.Item label="PG Year of Passing">{userData?.education?.pgYear}</Descriptions.Item>
              </Descriptions>
            </TabPane>

            {/* Experience Details Tab */}
            <TabPane tab="Experience Details" key="3">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Previous Company Name">{userData?.experience?.company}</Descriptions.Item>
                <Descriptions.Item label="Previous Job Title">{userData?.experience?.jobTitle}</Descriptions.Item>
                <Descriptions.Item label="Years of Experience">{userData?.experience?.years}</Descriptions.Item>
              </Descriptions>
            </TabPane>

            {/* Document Details Tab */}
            <TabPane tab="Document Details" key="4">
              <Descriptions bordered column={1}>
                {userData?.documents?.map((doc: any) => (
                  <Descriptions.Item label={doc.name} key={doc.name}>
                    <div className="flex space-x-4">
                      <Button onClick={() => handleFileAction(doc.name, "view")}>View</Button>
                      <Button onClick={() => handleFileAction(doc.name, "download")} type="primary">
                        Download
                      </Button>
                    </div>
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </TabPane>

            {/* Address Details Tab */}
            <TabPane tab="Address Details" key="5">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Permanent Address">{userData?.address?.permanent}</Descriptions.Item>
                <Descriptions.Item label="Present Address">{userData?.address?.present}</Descriptions.Item>
                <Descriptions.Item label="City">{userData?.address?.city}</Descriptions.Item>
                <Descriptions.Item label="State">{userData?.address?.state}</Descriptions.Item>
                <Descriptions.Item label="Country">{userData?.address?.country}</Descriptions.Item>
                <Descriptions.Item label="Zip Code">{userData?.address?.zip}</Descriptions.Item>
              </Descriptions>
            </TabPane>

            {/* Bank Details Tab */}
            <TabPane tab="Bank Details" key="6">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Account Name">{userData?.bank?.accountName}</Descriptions.Item>
                <Descriptions.Item label="Account Number">{userData?.bank?.accountNumber}</Descriptions.Item>
                <Descriptions.Item label="Bank Branch">{userData?.bank?.branch}</Descriptions.Item>
                <Descriptions.Item label="IFS Code">{userData?.bank?.ifsCode}</Descriptions.Item>
              </Descriptions>
            </TabPane>

            <TabPane tab="Payslip" key="7">
            <Table
              dataSource={samplePayslipData}
              columns={[
                { title: "Month", dataIndex: "month", key: "month" },
                { title: "Year", dataIndex: "year", key: "year" },
                {
                  title: "Action",
                  key: "action",
                  render: (_, record) => (
                    <Button
                      className="w-1/4"
                      onClick={() => handleFileAction(record.fileName, "view")}
                      type="primary"
                    >
                      View & Download
                    </Button>
                  ),
                },
              ]}
            />
          </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
