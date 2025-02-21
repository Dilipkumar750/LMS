import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Vendor } from ".";
import { getProfileDetailById } from "./api";
import { ImagePlacehoilder } from "../../common-components/skelton/image-placeholder-skelton";


const VendorProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [vendorInfo, setVendorInfo] = useState<Vendor | null>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        fetchVendorProfile();
    }, [id]);

    const fetchVendorProfile = async () => {
        setLoading(true);
        try {
            const result = await getProfileDetailById(id as string);

            if (result?.data) {
                setVendorInfo(result.data);
            } else {
                setVendorInfo(null);
            }
        } catch (error) {
            console.error('Error fetching vendor profile:', error);
            setVendorInfo(null);
        } finally {
            setLoading(false)
        }
    };

    if (!vendorInfo) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No Vendor Data Available</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                {loading ? (
                    <div className="m-4">
                        <ImagePlacehoilder />
                    </div>
                ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        {/* Profile Sidebar */}
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={"/images/profile-1.svg"}
                                        alt={vendorInfo?.userId?.name}
                                        className="w-32 h-32 bg-gray-300 rounded-full mb-4"
                                    />
                                    <h1 className="text-xl font-bold">{vendorInfo?.userId?.name}</h1>
                                    <p className="text-gray-700">{vendorInfo?.userId.email}</p>
                                    <p className="text-gray-700">{vendorInfo?.userId.mobile}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4 sm:col-span-9">

                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Vendor Details</h2>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 font-bold">Business Name</td>
                                            <td className="border border-gray-300 px-4 py-2">{vendorInfo?.businessName}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 font-bold">Business Type</td>
                                            <td className="border border-gray-300 px-4 py-2">{vendorInfo?.businessType}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 font-bold">Business Registration Number</td>
                                            <td className="border border-gray-300 px-4 py-2">{vendorInfo?.businessRegistrationNumber}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 font-bold">Tax Identification Number</td>
                                            <td className="border border-gray-300 px-4 py-2">{vendorInfo?.taxIdentificationNumber}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 font-bold">Business License Number</td>
                                            <td className="border border-gray-300 px-4 py-2">{vendorInfo?.businessLicenseNumber}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 font-bold">Website URL</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <a href={vendorInfo?.websiteURL} target="_blank" className="text-blue-500 hover:underline">
                                                    {vendorInfo?.websiteURL}
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 font-bold">Registered Address</td>
                                            <td className="border border-gray-300 px-4 py-2">{vendorInfo?.registeredAddress}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 font-bold">Operational Address</td>
                                            <td className="border border-gray-300 px-4 py-2">{vendorInfo?.operationalAddress}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* <h2 className="text-xl font-bold mt-6 mb-4">Product Information</h2> */}
                                {/* <table className="w-full border-collapse border border-gray-300">
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 font-bold">Product Categories</td>
                        <td className="border border-gray-300 px-4 py-2">{vendorInfo?.productCategories.join(", ")}</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 font-bold">Brand Names</td>
                        <td className="border border-gray-300 px-4 py-2">{vendorInfo?.brandNames.join(", ")}</td>
                    </tr>
                </tbody>
            </table> */}

                                {/* <h3 className="text-lg font-bold mt-4 mb-2">Products</h3> */}
                                {/* <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {vendorDetails?.products.map((product, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                            <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

                                {/* <h2 className="text-xl font-bold mt-6 mb-4">Documents</h2> */}
                                {/* <div className=" grid grid-cols-3 gap-4">
                {vendorDetails?.documents.aadharCard && (
                    <div>
                        <label className="font-bold block mb-2">Aadhar Card</label>
                        <img
                            src={vendorDetails.documents.aadharCard}
                            alt="Aadhar Card"
                            className="w-32 h-32 border border-gray-300 rounded"
                        />
                    </div>
                )}
                {vendorDetails.documents.pancard && (
                    <div>
                        <label className="font-bold block mb-2">Pancard</label>
                        <img
                            src={vendorDetails.documents.pancard}
                            alt="Pancard"
                            className="w-32 h-32 border border-gray-300 rounded"
                        />
                    </div>
                )}
                {vendorDetails.documents.registrationForm && (
                    <div>
                        <label className="font-bold block mb-2">Registration Form</label>
                        <img
                            src={vendorDetails.documents.registrationForm}
                            alt="Registration Form"
                            className="w-32 h-32 border border-gray-300 rounded"
                        />
                    </div>
                )}
                {vendorDetails.documents.otherDocuments?.map((doc, index) => (
                    <div key={index}>
                        <label className="font-bold block mb-2">Other Document {index + 1}</label>
                        <img
                            src={doc}
                            alt={`Other Document ${index + 1}`}
                            className="w-32 h-32 border border-gray-300 rounded"
                        />
                    </div>
                ))}
            </div> */}
                            </div>



                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default VendorProfile;
