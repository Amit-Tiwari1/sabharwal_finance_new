// this is response type i want to show menus

const resMenus = {
    "message": "User menus fetched successfully",
    "success": true,
    "userMenus": [
      {
        "MenuId": 1,
        "MenuName": "Dashboard",
        "MenuUrl": "/dashboard",
        "icon": null,
        "permissions": {
          "canCreate": true,
          "canRead": true,
          "canUpdate": true,
          "canDelete": true
        }
      },
      {
        "MenuId": 2,
        "MenuName": "Company",
        "MenuUrl": "/company",
        "icon": null,
        "permissions": {
          "canCreate": true,
          "canRead": true,
          "canUpdate": true,
          "canDelete": true
        },
        "submenus": [
          {
            "MenuId": 3,
            "MenuName": "Profile",
            "MenuUrl": "/company/profile",
            "icon": null,
            "permissions": {
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": false
            }
          },
          {
            "MenuId": 4,
            "MenuName": "Branches",
            "MenuUrl": "/company/branches",
            "icon": null,
            "permissions": {
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true
            }
          }
        ]
      },
      {
        "MenuId": 7,
        "MenuName": "User Management",
        "MenuUrl": "/user",
        "icon": null,
        "permissions": {
          "canCreate": true,
          "canRead": true,
          "canUpdate": true,
          "canDelete": true
        },
        "submenus": [
          {
            "MenuId": 8,
            "MenuName": "Role & Permissions",
            "MenuUrl": "/user/role",
            "icon": null,
            "permissions": {
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true
            }
          },
          {
            "MenuId": 9,
            "MenuName": "Users",
            "MenuUrl": "/user/all",
            "icon": null,
            "permissions": {
              "canCreate": true,
              "canRead": true,
              "canUpdate": true,
              "canDelete": true
            }
          }
        ]
      }
    ]
  }

  