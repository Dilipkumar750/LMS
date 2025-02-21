import { useEffect, useState } from "react";
import { Vendor } from ".";
import { getAllVendors } from "./api";
import { APPROVED_STATUS, Status } from "../../common-components/interface";
import { Spin } from "../../common-components/spin";
import { FiUser } from "react-icons/fi";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

interface VendorPropType {
  onClickEdit: (editData: any) => void
  search: string
}

export const VendorList: React.FC<VendorPropType> = ({
  onClickEdit,
  search
}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const [allVendors, setAllVendors] = useState<Vendor[]>([]);

  console.log(allVendors, 'allVendors')
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const result = await getAllVendors();
      if (result?.data?.length) {
        setAllVendors(result.data);
      } else {
        setAllVendors([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setAllVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const rowsPerPage = 10;
  const currentPage = 1;
  const totalPages = 5;

  const statusColors: { [key in APPROVED_STATUS]: string } = {
    [APPROVED_STATUS.PENDING]: 'bg-yellow-500',
    [APPROVED_STATUS.APPROVED]: 'bg-green-500',
    [APPROVED_STATUS.REJECTED]: 'bg-red-500',
  };


  const goToProfilePage = (id: string) => {
    navigate(`/home/vendor-profile/${id}`)
  }
  return (
    <div className="max-w-7xl mx-auto p-4 bg-white h-full">
      {" "}
      <h3 className="text-4xl font-extrabold text-gray-800 mb-6">
        Vendor Details
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Mobile</th>
              <th className="py-2 px-4 text-left">Business Name</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  <Spin />
                </td>
              </tr>
            ) : allVendors.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No Data
                </td>
              </tr>
            ) : (
              allVendors?.map((vendor) => (
                <tr key={vendor?._id}>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {vendor?.userId?.name || ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {vendor?.userId?.email || ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {vendor?.userId?.mobile || ''}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {vendor?.businessName}
                  </td>
                  <td className="border border-gray-300 px-4 text-sm  py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${statusColors[vendor.status]
                        }`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {DateTime.fromISO(vendor?.createdAt as any).toFormat('dd MMM yyyy')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-between gap-2">

                      <button
                        onClick={() => goToProfilePage(vendor?._id)}
                        className="p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                      >
                        View
                      </button>
                      <button
                        // onClick={() => handleDelete(vendor.id)}
                        className="p-1 rounded-lg text-white bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => goToProfilePage(vendor?._id)}
                        style={{ background: 'transparent' }}
                        className="p-1 focus:outline-none"
                      >
                        <FiUser className="h-6 w-6 text-green-600" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4 gap-10 w-1/4">
        <button className="py-1 px-3 rounded bg-blue-500 text-white hover:bg-blue-600">
          Previous
        </button>

        <span className="font-medium text-gray-700">{currentPage}</span>

        <button className="py-1 px-3 rounded bg-blue-500 text-white hover:bg-blue-600">
          Next
        </button>
      </div>
    </div>
  );
};
