(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[68],{73067:function(e,r,n){"use strict";n.d(r,{Z:function(){return a}});var t=n(62898);/**
 * @license lucide-react v0.341.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,t.Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},66263:function(e,r,n){Promise.resolve().then(n.bind(n,86713))},86713:function(e,r,n){"use strict";n.r(r),n.d(r,{CampaignEditForm:function(){return CampaignEditForm}});var t=n(57437),a=n(24866),s=n(70388),i=n(23611),l=n(49598),c=n(35831),d=n(61465),o=n(22147),u=n(73067),f=n(61396),m=n.n(f),x=n(2265),p=n(71424);function CampaignEditForm(e){let{campaign:r}=e,[n,f]=(0,x.useState)({name:r.name,subject:r.subject,content:r.content});return(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)(a.x,{campaignName:r.name}),(0,t.jsx)(s.r,{children:(0,t.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,t.jsx)("h2",{className:"text-2xl font-medium",children:"Edit Campaign"}),(0,t.jsx)("p",{className:"text-[hsl(var(--md-secondary))]",children:"Update your campaign details."})]}),(0,t.jsx)(i.z,{variant:"secondary",asChild:!0,children:(0,t.jsxs)(m(),{href:"/dashboard/campaigns/".concat(r.id),children:[(0,t.jsx)(u.Z,{className:"mr-2 h-4 w-4"}),"Back to Campaign"]})})]}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault(),p.Am.success("Campaign updated successfully!")},className:"space-y-8",children:[(0,t.jsx)(l.Zb,{className:"p-6",children:(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(d._,{htmlFor:"name",children:"Campaign Name"}),(0,t.jsx)(c.I,{id:"name",value:n.name,onChange:e=>f({...n,name:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(d._,{htmlFor:"subject",children:"Email Subject"}),(0,t.jsx)(c.I,{id:"subject",value:n.subject,onChange:e=>f({...n,subject:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(d._,{htmlFor:"content",children:"Email Content"}),(0,t.jsx)(o.g,{id:"content",value:n.content,onChange:e=>f({...n,content:e.target.value}),className:"min-h-[200px]",required:!0})]})]})}),(0,t.jsx)("div",{className:"flex justify-end gap-4",children:(0,t.jsx)(i.z,{type:"submit",children:"Save Changes"})})]})]})})]})}},49598:function(e,r,n){"use strict";n.d(r,{Ol:function(){return l},SZ:function(){return d},Zb:function(){return i},aY:function(){return o},eW:function(){return u},ll:function(){return c}});var t=n(57437),a=n(2265),s=n(81628);let i=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,s.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",n),...a})});i.displayName="Card";let l=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,s.cn)("flex flex-col space-y-1.5 p-6",n),...a})});l.displayName="CardHeader";let c=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("h3",{ref:r,className:(0,s.cn)("text-2xl font-semibold leading-none tracking-tight",n),...a})});c.displayName="CardTitle";let d=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("p",{ref:r,className:(0,s.cn)("text-sm text-muted-foreground",n),...a})});d.displayName="CardDescription";let o=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,s.cn)("p-6 pt-0",n),...a})});o.displayName="CardContent";let u=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,s.cn)("flex items-center p-6 pt-0",n),...a})});u.displayName="CardFooter"},35831:function(e,r,n){"use strict";n.d(r,{I:function(){return i}});var t=n(57437),a=n(2265),s=n(81628);let i=a.forwardRef((e,r)=>{let{className:n,type:a,...i}=e;return(0,t.jsx)("input",{type:a,className:(0,s.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",n),ref:r,...i})});i.displayName="Input"},61465:function(e,r,n){"use strict";n.d(r,{_:function(){return d}});var t=n(57437),a=n(2265),s=n(36743),i=n(39213),l=n(81628);let c=(0,i.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),d=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)(s.f,{ref:r,className:(0,l.cn)(c(),n),...a})});d.displayName=s.f.displayName},22147:function(e,r,n){"use strict";n.d(r,{g:function(){return i}});var t=n(57437),a=n(2265),s=n(81628);let i=a.forwardRef((e,r)=>{let{className:n,...a}=e;return(0,t.jsx)("textarea",{className:(0,s.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",n),ref:r,...a})});i.displayName="Textarea"}},function(e){e.O(0,[579,700,390,600,445,315,971,472,744],function(){return e(e.s=66263)}),_N_E=e.O()}]);