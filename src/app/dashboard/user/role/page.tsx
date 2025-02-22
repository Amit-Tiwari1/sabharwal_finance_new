"use client";
import { EditIcon } from "../../../../../public/icons/EditIcon";
import { DeleteIcon } from "../../../../../public/icons/DeleteIcon";
import {
  Button,
  Checkbox,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Spinner
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { createNewRole, getAllMenus, getAllRoles } from "@/app/services/menuService";
import { roleTypes,Menu,Permissions } from "@/app/utils/interface"; 
import { roleColumns } from "@/app/utils/tablecoloumns";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import useNotifications from "@/hooks/useNotifications";
// Type definitions
const statusColorMap: Record<string, "success" | "danger" | "warning" | "default"> = {
  SuperAdmin: "success",
  Admin: "danger",
  HR: "warning",
};

export default function UserRole() {
  const { notifySuccess, notifyError } = useNotifications();
  const [allRoles, setAllRoles] = useState<roleTypes[]>([]);
  const [openAddNewUser, setAddNewUser] = useState<boolean>(false);
  const [allMenus, setAllMenus] = useState<Menu[]>([]);
  const [roleName, setRoleName] = useState<string>("");
  const [positionName, setPositionName] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [permissions, setPermissions] = useState<Permissions>({});
  const [menuCounts, setMenuCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMenus, setSelectedMenus] = useState<number[]>([]);

  const fetchAllRoles = async () => {
    setLoading(true);
    try {
      const response = await getAllRoles();
      console.log("response", response);
      
      setAllRoles(response.result || []);
    } catch (error:any) {
      notifyError(`${error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllRoles();
  }, []);
  useEffect(() => {
    const fetchAllRoles = async () => {
      setLoading(true);
      try {
        const response = await getAllRoles();
        setAllRoles(response.result || []);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchAllRoles();
  }, []);

  useEffect(() => {
    const fetchAllMenus = async () => {
      setLoading(true);
      try {
        const response = await getAllMenus();
        setAllMenus(response.result || []);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMenus();
  }, []);


  const handleParentClick = (menuId: number) => {
    console.log(" parent menu id:- ", menuId);
    
    setActiveMenu((prevActive) => (prevActive === menuId ? null : menuId));
  };

  const handleMainSubmenu = (menuId: number, status: boolean) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[menuId] = {
        canCreate: status,
        canRead: status,
        canUpdate: status,
        canDelete: status,
      };

      const allChecked =
        newPermissions[menuId].canCreate &&
        newPermissions[menuId].canRead &&
        newPermissions[menuId].canUpdate &&
        newPermissions[menuId].canDelete;

      newPermissions[menuId].isMainChecked = allChecked;

      return newPermissions;
    });
  };

  const handleMainSubmenuOperations = (
    menuId: number,
    checkboxType: keyof Permissions[number],
    value: boolean
  ) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      if (!newPermissions[menuId]) {
        newPermissions[menuId] = { canCreate: false, canRead: false, canUpdate: false, canDelete: false };
      }
      newPermissions[menuId][checkboxType] = value;

      const allChecked =
        newPermissions[menuId].canCreate &&
        newPermissions[menuId].canRead &&
        newPermissions[menuId].canUpdate &&
        newPermissions[menuId].canDelete;

      newPermissions[menuId].isMainChecked = allChecked;

      return newPermissions;
    });
  };

  const handleSaveRole = async () => {
    const rolePayload = {
      roleName,
      roleDescription: positionName,
      permissions: allMenus.flatMap((menu) => {
        const parentPermission = {
          menuId: menu.MenuId,
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
        };

        const submenuPermissions = (menu.Submenus || [])
          .map((submenu) => {
            const submenuPermission = {
              menuId: submenu.MenuId,
              canCreate: permissions[submenu.MenuId]?.canCreate || false,
              canRead: permissions[submenu.MenuId]?.canRead || false,
              canUpdate: permissions[submenu.MenuId]?.canUpdate || false,
              canDelete: permissions[submenu.MenuId]?.canDelete || false,
            };

            return (
              (submenuPermission.canCreate ||
                submenuPermission.canRead ||
                submenuPermission.canUpdate ||
                submenuPermission.canDelete) &&
              submenuPermission
            );
          })
          .filter(Boolean);

        return submenuPermissions.length > 0 ? [parentPermission, ...submenuPermissions] : [];
      }),
    };
    console.log(" Final payload :- ", rolePayload);

    try {
      const response = await createNewRole(rolePayload);
      if (response.status === 200) {
        notifySuccess("Role created successfully! 🎉");
        fetchAllRoles();
      }else {
        notifyError("Failed to create role. Please try again.");
      }
      setRoleName("");
      setPositionName("");
      setPermissions({});
      setActiveMenu(null);
      setMenuCounts({});
      setAddNewUser(false);
    } catch (error:any) {
      notifyError(`Error:- ${error.message} `);
      console.log("Error while creating role:", error);
    }
  };

  // Render cell in table
  const renderCell = React.useCallback((user: roleTypes, columnKey: string) => {
    const cellValue = user[columnKey as keyof roleTypes];
    switch (columnKey) {
      case "roleName":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.roleName]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "roleDescription":
        return <div className="flex flex-col"><p className="text-bold text-sm capitalize">{cellValue}</p></div>;
      case "createdAt":
        return <p>{new Date(cellValue).toLocaleString()}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
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
        return cellValue;
    }
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Role Management</h1>
        <Button color="primary" onPress={() => setAddNewUser(true)}>
          Add New Role
        </Button>
      </div>
      <div className="w-full border-collapse mt-5">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={roleColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={allRoles}>
              {(item) => (
                <TableRow key={item.roleId}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, String(columnKey))}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
  
      <Modal
        isOpen={openAddNewUser}
        onOpenChange={setAddNewUser}
        scrollBehavior="inside"
        size="full"
      >
        <ModalContent className="max-w-full max-h-screen">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold mb-4">
                Add New Role/Permissions
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Role Name"
                    placeholder="Enter Role Name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    size="sm"
                  />
                  <Input
                    label="Position Name"
                    placeholder="Position name (e.g., Section Officer)"
                    value={positionName}
                    onChange={(e) => setPositionName(e.target.value)}
                    size="sm"
                  />
                </div>
  
                <div className="menu-container flex flex-wrap gap-4 p-4 bg-gray-800 rounded-sm">
                  {allMenus.map((menu) => (
                    <div key={menu.MenuId} className="menu-item mb-4 w-auto bg-red-300">
                      <div
                        className="flex items-center p-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => handleParentClick(menu.MenuId)}
                      >
                        <span>{menu.MenuName}</span>
                        <div className="ml-2 bg-[#f29d13] text-white w-6 h-6 text-center rounded-full">
                          {menuCounts[menu.MenuId] || 0}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className="flex gap-4 flex-wrap justify-center submenu-container mt-6 p-4 bg-gray-50 rounded-md">
                  {activeMenu &&
                    (() => {
                      const selectedMenu = allMenus.find(
                        (menu) => menu.MenuId === activeMenu
                      );
  
                      if (!selectedMenu?.Submenus?.length) {
                        return (
                          <div className="text-center text-gray-700">
                            <p>This menu does not have any submenus.</p>
                            <label className="flex items-center gap-2 mt-2">
                              <Checkbox />
                              <span>Show this parent menu</span>
                            </label>
                          </div>
                        );
                      }
  
                      return selectedMenu.Submenus.map((submenu) => (
                        <div key={submenu.MenuId} className="relative group w-full md:w-1/3">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                          <div className="relative px-2 py-1 bg-white ring-1 ring-gray-900/5 rounded-lg shadow-md leading-none space-y-4">
                            <h2 className="text-lg font-semibold text-white bg-[#192538] p-1 rounded">
                              <Checkbox
                                isSelected={permissions[submenu.MenuId]?.isMainChecked || false}
                                onChange={(e) => {
                                  handleMainSubmenu(submenu.MenuId, e.target.checked);
                                }}
                              />
                              {submenu.MenuName}
                            </h2>
                            <div className="flex flex-col gap-2">
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  isSelected={permissions[submenu.MenuId]?.canRead || false}
                                  onChange={(e) => {
                                    handleMainSubmenuOperations(submenu.MenuId, "canRead", e.target.checked);
                                  }}
                                />
                                <span>canRead</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  isSelected={permissions[submenu.MenuId]?.canCreate || false}
                                  onChange={(e) => {
                                    handleMainSubmenuOperations(submenu.MenuId, "canCreate", e.target.checked);
                                  }}
                                />
                                <span>canCreate</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  isSelected={permissions[submenu.MenuId]?.canUpdate || false}
                                  onChange={(e) => {
                                    handleMainSubmenuOperations(submenu.MenuId, "canUpdate", e.target.checked);
                                  }}
                                />
                                <span>canUpdate</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  isSelected={permissions[submenu.MenuId]?.canDelete || false}
                                  onChange={(e) => {
                                    handleMainSubmenuOperations(submenu.MenuId, "canDelete", e.target.checked);
                                  }}
                                />
                                <span>canDelete</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ));
                    })()}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSaveRole}>
                  Save
                </Button>
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
  
}
