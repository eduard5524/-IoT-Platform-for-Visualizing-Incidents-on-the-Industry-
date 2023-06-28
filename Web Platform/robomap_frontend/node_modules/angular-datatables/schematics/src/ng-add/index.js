"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schematics_utilities_1 = require("schematics-utilities");
const tasks_1 = require("@angular-devkit/schematics/tasks");
function default_1(_options) {
    return schematics_1.chain([
        addPackageJsonDependencies(),
        installPackageJsonDependencies(),
        updateAngularJsonFile(),
        addModuleToAppModule()
    ]);
}
exports.default = default_1;
function addPackageJsonDependencies() {
    return (tree, context) => {
        // Update package.json
        const dependencies = [
            { type: schematics_utilities_1.NodeDependencyType.Default, version: '^3.4.1', name: 'jquery' },
            { type: schematics_utilities_1.NodeDependencyType.Default, version: '^1.10.20', name: 'datatables.net' },
            { type: schematics_utilities_1.NodeDependencyType.Default, version: '^1.10.20', name: 'datatables.net-dt' },
            { type: schematics_utilities_1.NodeDependencyType.Default, version: '^8.0.0', name: 'angular-datatables' },
            { type: schematics_utilities_1.NodeDependencyType.Dev, version: '^3.3.33', name: '@types/jquery' },
            { type: schematics_utilities_1.NodeDependencyType.Dev, version: '^1.10.18', name: '@types/datatables.net' }
        ];
        dependencies.forEach(dependency => {
            schematics_utilities_1.addPackageJsonDependency(tree, dependency);
            context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
        });
        return tree;
    };
}
function installPackageJsonDependencies() {
    return (host, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.log('info', `🔍 Installing packages...`);
        return host;
    };
}
function updateAngularJsonFile() {
    return (tree, context) => {
        try {
            const angularJsonFile = tree.read('angular.json');
            if (angularJsonFile) {
                const angularJsonFileObject = JSON.parse(angularJsonFile.toString('utf-8'));
                const project = Object.keys(angularJsonFileObject['projects'])[0];
                const projectObject = angularJsonFileObject.projects[project];
                const styles = projectObject.targets.build.options.styles;
                const scripts = projectObject.targets.build.options.scripts;
                styles.push({
                    input: "node_modules/datatables.net-dt/css/jquery.dataTables.css"
                });
                scripts.push({
                    input: "node_modules/jquery/dist/jquery.js"
                });
                scripts.push({
                    input: "node_modules/datatables.net/js/jquery.dataTables.js"
                });
                tree.overwrite('angular.json', JSON.stringify(angularJsonFileObject, null, 2));
                context.logger.log('info', `✅️ Updated angular.json`);
            }
            else {
                context.logger.log('error', '🚫 Failed to locate angular.json.');
            }
        }
        catch (e) {
            context.logger.log('error', `🚫 Failed to update angular.json.`);
        }
    };
}
function addModuleToAppModule() {
    return (host, context) => {
        const moduleName = 'DataTablesModule';
        try {
            const workspace = schematics_utilities_1.getWorkspace(host);
            const project = schematics_utilities_1.getProjectFromWorkspace(workspace, Object.keys(workspace['projects'])[0]);
            schematics_utilities_1.addModuleImportToRootModule(host, moduleName, 'angular-datatables', project);
        }
        catch (e) {
            context.logger.log('error', `🚫 Failed to update app.module.ts`);
            return host;
        }
        context.logger.log('info', `✅️ "${moduleName}" is imported`);
    };
}
//# sourceMappingURL=index.js.map