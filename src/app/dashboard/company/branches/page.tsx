"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Alert,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Spinner,
} from "@heroui/react";
import { branchColumns } from "@/app/utils/tablecoloumns";
import { EditIcon } from "../../../../../public/icons/EditIcon";
import { DeleteIcon } from "../../../../../public/icons/DeleteIcon";
import React, { useEffect, useState } from "react";
import { BranchTypes } from "@/app/utils/interface";
import { getAllBranches, createBranch, updateBranch, deleteBranch } from "@/app/services/branchService";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import useNotifications from "@/hooks/useNotifications";

export default function BranchPage() {
  const { notifySuccess, notifyError } = useNotifications();

  const [allBranches, setAllBranches] = useState<BranchTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    branchName: "",
    branchCode: "",
    ifscCode: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    contactEmail: "",
    contactNo: "",
    gstNo: "",
    openDate: "",
  });

  useEffect(() => {
    fetchAllBranches();
  }, []);

  const fetchAllBranches = async () => {
    setLoading(true);
    try {
      const response = await getAllBranches();
      setAllBranches(response.result || []);
    } catch (error: any) {
      setError(error.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setFormLoading(true);
    try {
      if (editMode && selectedBranchId) {
        // ✅ UPDATE branch
        const response = await updateBranch(selectedBranchId, {
          ...formData,
          openDate: new Date(formData.openDate).toISOString(),
        });

        if (response.success) {
          notifySuccess("Branch updated successfully!");
        } else {
          notifyError(response.errorMessage);
        }
      } else {
        // ✅ ADD new branch
        const response = await createBranch({
          ...formData,
          openDate: new Date(formData.openDate).toISOString(),
        });

        if (response.success) {
          notifySuccess("Branch added successfully!");
        } else {
          notifyError(response.errorMessage);
        }
      }

      setOpenModal(false);
      resetForm();
      fetchAllBranches();
    } catch (error: any) {
      notifyError(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  /** ✅ Reset Form */
  const resetForm = () => {
    setFormData({
      branchName: "",
      branchCode: "",
      ifscCode: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      contactEmail: "",
      contactNo: "",
      gstNo: "",
      openDate: "",
    });
    setEditMode(false);
    setSelectedBranchId(null);
  };

  const handleEditBranch = (branch: BranchTypes) => {

    setSelectedBranchId(branch.id);
    setFormData({
      branchName: branch.branchName || "",
      branchCode: branch.branchCode || "",
      ifscCode: branch.ifscCode || "",
      address1: branch.address1 || "",
      address2: branch.address2 || "",
      city: branch.city || "",
      state: branch.state || "",
      pincode: branch.pincode || "",
      country: branch.country || "",
      contactEmail: branch.contactEmail || "",
      contactNo: branch.contactNo || "",
      gstNo: branch.gstNo || "",
      openDate: branch.openDate ? branch.openDate.split("T")[0] : "",
    });

    setEditMode(true);
    setOpenModal(true);
  };
  const handleDeleteClick = (branchId: number) => {
    setBranchToDelete(branchId);
    setDeleteModal(true);
  };

  /** ✅ Confirm Delete */
  const confirmDeleteBranch = async () => {
    if (!branchToDelete) return;
    try {
      await deleteBranch(branchToDelete);
      notifySuccess("Branch deleted successfully!");
      fetchAllBranches();
    } catch (error: any) {
      notifyError(error.message);
    } finally {
      setDeleteModal(false);
      setBranchToDelete(null);
    }
  };


  const renderBranchTable = React.useCallback(
    (branch: BranchTypes, columnKey: string) => {
      const cellValue = branch[columnKey as keyof BranchTypes];

      switch (columnKey) {
        case "branchName":
          return <Chip className="capitalize px-2 py-1 text-white bg-blue-500 rounded-full">{cellValue}</Chip>;
        case "branchCode":
          return <p className="font-semibold text-gray-700">{cellValue}</p>;
        case "address1":
          return (
            <div className="text-sm text-gray-600">
              <p className="font-medium">{cellValue}</p>
              <p>{branch.city}, {branch.state}, {branch.pincode}</p>
            </div>
          );
        case "contactEmail":
          return <p className="text-blue-500 underline cursor-pointer hover:text-blue-700 transition">{cellValue}</p>;
        case "contactNo":
          return <p className="font-medium text-gray-800">{cellValue}</p>;
        case "gstNo":
          return <Chip className="bg-green-500 text-white px-2 py-1 rounded-md">{cellValue || "N/A"}</Chip>;
        case "actions":
          return (
            <div className="flex items-center gap-3">
              <Tooltip content="Edit Branch">
                <span className="cursor-pointer text-blue-600 hover:text-blue-800 transition"
                onClick={()=>{
                    handleEditBranch(branch);
                }}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Branch">
                <span className="cursor-pointer text-red-600 hover:text-red-800 transition"
                onClick={() => handleDeleteClick(branch.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Branch Management</h1>
        <Button color="primary" onPress={() => setOpenModal(true)}>Add New Branch</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <SkeletonLoader />
        </div>
      ) : error ? (
        <Alert color="danger" title="Error">{error}</Alert>
      ) : (
        <Table
          aria-label="Branch Details Table"
          isStriped
          className="shadow-lg rounded-lg bg-white overflow-hidden"
        >
          <TableHeader columns={branchColumns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="text-gray-700 font-semibold bg-gray-200">
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={allBranches}>
            {(branch) => (
              <TableRow key={branch.id} className="hover:bg-gray-50">
                {(columnKey) => <TableCell className="py-3 px-4">{renderBranchTable(branch, String(columnKey))}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Add Branch Modal */}
      <Modal isOpen={openModal} onOpenChange={setOpenModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">Add New Branch</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Branch Name" name="branchName" value={formData.branchName} onChange={handleChange} required />
                  <Input label="Branch Code" name="branchCode" value={formData.branchCode} onChange={handleChange} required />
                  <Input label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
                  <Input label="Address" name="address1" value={formData.address1} onChange={handleChange} required />
                  <Input label="Address 2 (Optional)" name="address2" value={formData.address2} onChange={handleChange} />
                  <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                  <Input label="State" name="state" value={formData.state} onChange={handleChange} required />
                  <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
                  <Input label="Country" name="country" value={formData.country} onChange={handleChange} required />
                  <Input label="Contact Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
                  <Input label="Contact No" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
                  <Input label="Open Date" name="openDate" type="date" value={formData.openDate} onChange={handleChange} required />
                  <Input label="GST No" name="gstNo" value={formData.gstNo} onChange={handleChange} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="bordered">Cancel</Button>
                <Button color="primary" onPress={handleSubmit} isLoading={formLoading}>{editMode ? "Update Branch" : "Save Branch"}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={deleteModal} onOpenChange={setDeleteModal}>
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete this branch?</ModalBody>
          <ModalFooter>
            <Button onPress={() => setDeleteModal(false)}>Cancel</Button>
            <Button color="danger" onPress={confirmDeleteBranch}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
