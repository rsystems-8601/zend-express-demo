import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PortalDashboardComponent } from './portal-dashboard.component';

const routes: Routes = [
  {
    path:"",
    component : PortalDashboardComponent,
    children:[
      {path: "", redirectTo: "datacenter-list", pathMatch: "full"},
      {path: "datacenter-list", loadChildren: ()=> import("./datacenter/datacenter-list/datacenter-list.module").then(m => m.DatacenterListModule) },
      {path:"datacenter-list/:id", loadChildren:() => import("./datacenter/datacenter-view/datacenter-view.module").then(m => m.DatacenterViewModule)},
      {path:"datacenter-list/:id/:podId", loadChildren:() => import("./pods/pod-view/pod-view.module").then(m => m.PodViewModule)},
      { path: "configure", loadChildren:()=> import("./datacenter/datacenter-configure/datacenter-configure.module").then(infra=>infra.DatacenterconfigureModule)},
      { path: "provision", loadChildren:()=> import("./datacenter/datacenter-provision/datacenter-provision.module").then(infra=>infra.DatacenterProvisionModule)},
      // { path: "configure", loadChildren:()=> import("./datacenter/datacenter-configure/datacenter-configure.module").then(infra=>infra.DatacenterconfigureModule)},
      
      {path: "partner-list", loadChildren:() => import("./admin/partnermanagement/partnermanagement.module").then(m => m.PartnerManagementModule)},
      {path:"users", loadChildren:() => import("./admin/user/user.module").then(m => m.UserModule)},
      {path: "category", loadChildren:() => import("./admin/category/category.module").then(m => m.CategorymanagementModule)},
      {path: "customer-management", loadChildren:() => import("./admin/customermanagement/customermanagement.module").then(m => m.CustomerManagementModule)},
      {path: "product-rates", loadChildren: ()=> import("./admin/productrates/product.module").then(m => m.ProductmanagementModule)},
      {path: "email-templates", loadChildren: () => import("./admin/emailtemplate/emailtemplate.module").then(m => m.EmailtemplatemanagementModule)},
      // { path: "configure", loadChildren:()=> import("./datacenter/datacenter-configure/datacenter-configure.module").then(infra=>infra.DatacenterconfigureModule)},
      { path: "customer-assignment", loadChildren:()=> import("./customer-assignment/customer-assignment.module").then(customer=>customer.CustomerAssignmentModule)},
      { path: "appliances", loadChildren:()=> import("./appliances/appliances.module").then(appliances=>appliances.AppliancesModule)},
      { path: "master-configuration", loadChildren:()=> import("./master-configuration/masterconfiguration.module").then(masterConfig=>masterConfig.MasterconfigurationModule)},
      {path: "applications", loadChildren:() => import("./admin/application/application.module").then(m => m.ApplicationModule)},
      {path: "application-group", loadChildren:() => import("./admin/application-group/application-group.module").then(m => m.ApplicationGroupModule)},
      {path :"organizations", loadChildren:() => import("./admin/organization/organization.module").then(m => m.OrganizationModule)},
      {path:"organization-group", loadChildren:() => import("./admin/organization-group/organization-group.module").then( m=> m.OrganizationGroupModule)},
      {path:"customer", loadChildren:() => import("./customers/maintenance-calender/maintenance-calender.module").then( m=> m.MaintenanceCalenderModule)},
      {path:"announcements", loadChildren:() => import("./customers/announcements/announcements.module").then( m=> m.AnnouncementsModule)},
      {path:"notifications", loadChildren:() => import("./customers/notifications/notifications.module").then( m=> m.NotificationsModule)},
      {path:"scheduled-jobs", loadChildren:() => import("./customers/scheduled-jobs/scheduled-jobs.module").then( m=> m.ScheduledJobsModule)},
      {path: "tickets", loadChildren:() => import("./customers/dz-tickets/dz-tickets.module").then(m => m.DzTicketsModule)},
      {path: "provision-request", loadChildren:() => import("./customers/provisioning/c3-provisioning.module").then(m=> m.C3ProvisioningModule)}
    ]
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PortalDashboardRoutningModule { }
