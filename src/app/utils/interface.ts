export interface BranchType {
  id: number;
  branchName: string;
}
export interface role{
  id:number;
  roleName:string;
}
export interface UserType {
  id:number;
    username: string;
    fullName: string;
    email: string;
    mobilenumber: string;
    role: role;
    basicsalary:number | string;
    address1: string;
    city: string;
    state: string;
    pin: string;
    password: string;
    userpic:string;
    isactive:boolean;
    branches:BranchType
   
}

export interface userLoginDataType {
    identifier: string;
    password: string;
  }

export interface roleTypes{
    roleId:number;
    roleName:string;
    roleDescription:string;
    createdAt:string
}
  
export interface Menu {
    MenuId: number;
    MenuName: string;
    MenuParentId: number | null;
    MenuUrl: string;
    icon: string | null;
    createdAt: Date;
    updatedAt: Date;
    ParentMenu?: Menu;
    Submenus: Menu[]; 
    rolePermissions: RoleMenuPermission[];
  }
  export interface Permissions {
    [menuId: number]: {
      canCreate: boolean;
      canRead: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      isMainChecked?: boolean;
    };
  }
  export interface RoleMenuPermission {
    menuId: number;
    roleId: number;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }
  
  export interface BranchTypes {
    id: number;
    branchName: string;
    branchCode: string;
    openDate: string;
    ifscCode: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    contactEmail: string;
    contactNo: string;
    landlineNo?: string;
    gstNo?: string;
    createdAt: string;
    updatedAt: string;
  }
  