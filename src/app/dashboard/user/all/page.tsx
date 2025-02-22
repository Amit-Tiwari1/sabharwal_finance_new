"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Spinner,
  User,
  Chip,
  Select,
  SelectItem,
  Alert,
  SharedSelection,
} from "@heroui/react";
import { IoMdPhotos } from "react-icons/io";
import useNotifications from "@/hooks/useNotifications";
import {
  signupUser,
  SignupData,
  getAllUsers,
} from "@/app/services/userService";
import Image from "next/image";
import { EyeIcon } from "../../../../../public/icons/EyeIcon";
import { EditIcon } from "../../../../../public/icons/EditIcon";
import { DeleteIcon } from "../../../../../public/icons/DeleteIcon";
import { usersColumns } from "@/app/utils/tablecoloumns";
import { getAllRoles } from "@/app/services/menuService";
import {
  BranchType,
  BranchTypes,
  roleTypes,
  UserType,
} from "@/app/utils/interface";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import { getAllBranches } from "@/app/services/branchService";

const SignupPage = () => {
  const { notifySuccess, notifyError } = useNotifications();

  const [openAddNewUser, setAddNewUser] = useState(false);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allRoles, setAllRoles] = useState<roleTypes[]>([]);
  const [allBranchs, setallBranchs] = useState<BranchTypes[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<number[]>([]);

  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    mobilenumber: "",
    basicsalary: "",
    roleId: "",
    address1: "",
    landmark: "",
    city: "",
    state: "",
    pin: "",
    userpic: null as File | null,
    password: "",
  });


  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllUsers();

        if (response.success) {
          setAllUsers(response.result);
        } else {
          throw new Error(response.errorMessage || "Failed to fetch users");
        }
      } catch (err: any) {
        setError(err.errorMessage || "An error occurred");
        notifyError(err.errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchAllRoles = async () => {
      setLoading(true);
      try {
        const response = await getAllRoles();
        setAllRoles(response.result || []);
      } catch (error: any) {
        setError(error.errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRoles();
  }, []);
  useEffect(() => {
    const fetchAllBranch = async () => {
      setLoading(true);
      try {
        const response = await getAllBranches();
        setallBranchs(response.result || []);
      } catch (error: any) {
        setError(error.errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBranch();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBranchChange = (selected: SharedSelection) => {
    let selectedBranchIds = Array.from(selected).map(Number);

    if (selectedBranchIds.includes(-1)) {
      const allBranchIds = allBranchs.map((b) => b.id);
      setSelectedBranches(allBranchIds);
    } else {
      setSelectedBranches(selectedBranchIds);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg"];
      const maxSizeInMB = 2;

      if (!allowedTypes.includes(file.type)) {
        notifyError("Only JPEG or JPG files are allowed.");
        return;
      }

      if (file.size > maxSizeInMB * 1024 * 1024) {
        notifyError(`File size should not exceed ${maxSizeInMB} MB.`);
        return;
      }

      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, userpic: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formPayload: SignupData = {
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        mobilenumber: formData.mobilenumber,
        basicsalary: formData.basicsalary,
        roleId: formData.roleId,
        address1: formData.address1,
        landmark: formData.landmark || "",
        city: formData.city,
        state: formData.state,
        pin: formData.pin,
        userpic: formData.userpic,
        password: formData.password,
        branches: selectedBranches,
      };
      console.log("formPayload data- ", formPayload);

      const response = await signupUser(formPayload);

      if (response.success) {
        notifySuccess("User Added successfully!");

        setFormData({
          username: "",
          fullName: "",
          email: "",
          mobilenumber: "",
          basicsalary: "",
          roleId: "",
          address1: "",
          landmark: "",
          city: "",
          state: "",
          pin: "",
          userpic: null,
          password: "",
        });
        setSelectedBranches([]);
        setPreviewImage("");
        setAddNewUser(false);

        const usersResponse = await getAllUsers();
        if (usersResponse.success) {
          setAllUsers(usersResponse.result);
        } else {
          notifyError(usersResponse.message || "Failed to refresh user list");
        }
      } else {
        throw new Error(response.message || "Failed to add user");
      }
    } catch (error: any) {
      notifyError(error.message);
    }
  };

  const renderCell = React.useCallback((user: UserType, columnKey: string) => {
    switch (columnKey) {
      case "profile":
        return (
          <Image
            src={user.userpic}
            alt="User Profile Picture"
            width={50}
            height={50}
            className="rounded-full"
          />
        );
      case "nameEmail":
        return (
          <div>
            <p className="font-semibold capitalize">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        );
      case "role":
        return (
          <p className="capitalize">{user.role.roleName}</p>
        );

      case "branches":
        return (
          <div>
            {Array.isArray(user.branches) && user.branches.length > 0 ? (
              user.branches.map((branch: BranchType) => (
                <Chip className="ml-1" key={branch.id} size="sm" variant="flat">
                  {branch.branchName}
                </Chip>
              ))
            ) : (
              <p className="text-gray-500">No Branch Assigned</p>
            )}
          </div>
        );
      case "basicsalary":
        return <p>{user.basicsalary}</p>;
      case "mobilenumber":
        return <p>{user.mobilenumber}</p>;
      case "cityAddress":
        return (
          <div>
            <p className="capitalize">{user.city}</p>
            <p className="text-sm text-gray-500">
              {user.address1}, {user.state}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={user.isactive ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {user.isactive ? "Active" : "Inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">User Management</h1>

      <Button color="primary" onPress={() => setAddNewUser(true)}>
        Add New User
      </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <SkeletonLoader />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col w-full">
            <Alert color="danger" title="Error: ">
              {error}{" "}
            </Alert>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <Table aria-label="User Details Table" isStriped>
            <TableHeader columns={usersColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={allUsers}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, String(columnKey))}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      ;
      <Modal isOpen={openAddNewUser} onOpenChange={setAddNewUser} size="3xl">
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold mb-4">
                Add New User
              </ModalHeader>
              <ModalBody>
                <div className="w-full bg-white shadow-md rounded-md p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        required
                        fullWidth
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Mobile Number"
                        name="mobilenumber"
                        value={formData.mobilenumber}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Basic Salary"
                        name="basicsalary"
                        value={formData.basicsalary}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Select
                        name="roleId"
                        required
                        value={formData.roleId}
                        className="max-w-xs"
                        items={allRoles}
                        label="Role"
                        placeholder="Select Role"
                        onChange={handleChange}
                      >
                        {(role) => (
                          <SelectItem key={role.roleId} value={role.roleId}>
                            {role.roleName}
                          </SelectItem>
                        )}
                      </Select>
                      <Select
                        classNames={{
                          base: "max-w-xs",
                          trigger: "min-h-12 py-2",
                          label: "pb-1",
                        }}
                        isMultiline={true}
                        label="Branch"
                        selectionMode="multiple"
                        placeholder="Select Branch"
                        selectedKeys={new Set(selectedBranches.map(String))}
                        onSelectionChange={handleBranchChange}
                        items={[
                          { id: -1, branchName: "All Branches" },
                          ...allBranchs,
                        ]}
                        variant="bordered"
                        renderValue={(items) => (
                          <div className="flex flex-wrap gap-2 p-2">
                            {items.map((item) => (
                              <Chip key={item.key}>
                                {item.data?.branchName}
                              </Chip>
                            ))}
                          </div>
                        )}
                      >
                        {(branch) => (
                          <SelectItem
                            key={String(branch.id)}
                            textValue={branch.branchName}
                          >
                            <div className="flex gap-2 items-center">
                              <div className="flex flex-col">
                                <span className="text-small">
                                  {branch.branchName}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        )}
                      </Select>

                      <Input
                        label="Address 1"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Pin Code"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        required
                        fullWidth
                      />

                      <div className="flex items-center gap-3 mt-4">
                        <div className="w-28 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                          {previewImage ? (
                            <Image
                              src={previewImage}
                              alt="Preview"
                              className="object-cover w-full h-full"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <IoMdPhotos size={40} className="text-gray-400" />
                          )}
                        </div>
                        <Input
                          type="file"
                          accept="image/jpeg,image/jpg"
                          onChange={handleImageUpload}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      color="primary"
                      fullWidth
                      className="mt-4"
                    >
                      Signup
                    </Button>
                  </form>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignupPage;
