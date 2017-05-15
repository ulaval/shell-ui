import { createShell } from '../shell';
import {LoginPackage, createDummyAnalyticsServiceFactory, createLocalStorageIdentityServiceFactory} from '../dev';
import {createMpoAuditService} from '../mpo';
// import identity from '../mpo/identity';

const identityService = createLocalStorageIdentityServiceFactory('/login', '/login');
const auditService = createMpoAuditService('https://audit.monportail.test.ulaval.ca/audit/v1');
const gaService = createDummyAnalyticsServiceFactory();

const shell = createShell(identityService, auditService, gaService);

shell.registerPackages([{
    packageName: 'login',
    rootElement: 'log',
    load: () => Promise.resolve(new LoginPackage()),
    rootPath: '/login'
},
{
    packageName: 'mpoAdmission',
    rootElement: 'adm',
    load: 'http://localhost:8095/app.js',
    rootPath: '/'
}]);

shell.start();
