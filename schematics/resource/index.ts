import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { url, apply, mergeWith, move, chain, applyTemplates } from '@angular-devkit/schematics';

interface Options {
  name: string;
  layer: 'app' | 'admin' | 'client' | 'service';
}

const LAYER_PATHS = {
  app: 'src/modules/app',
  admin: 'src/modules/admin',
  client: 'src/modules/client',
  service: 'src/modules/service',
};

const camelize = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace(/[-_]/g, '');
  });
};

function updateRoutingModule({ name, layer }: Options): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dasherizedName = strings.dasherize(name);
    const className = strings.classify(name);
    const routingModulePath = normalize(`${LAYER_PATHS[layer]}/${layer}-routing.module.ts`);

    if (!tree.exists(routingModulePath)) {
      context.logger.error(`Routing module not found at ${routingModulePath}`);
      return tree;
    }

    const content = tree.read(routingModulePath)?.toString('utf-8');
    let updatedContent = content;

    // 1. Добавляем импорт модуля
    const nestCommonImport = "import { Module } from '@nestjs/common';";
    const newImport = `import { ${className}Module } from './${dasherizedName}';`;

    if (!updatedContent?.includes(newImport)) {
      updatedContent = updatedContent?.replace(nestCommonImport, `${nestCommonImport}\n${newImport}`);
    }

    // 2. Добавляем маршрут в children
    const routerChildren = 'children: [';
    console.log('do', updatedContent);
    updatedContent = updatedContent?.replace(
      routerChildren,
      `${routerChildren} {path: '${dasherizedName}', module: ${className}Module}, `,
    );
    console.log('posle', updatedContent);

    // 3. Добавляем модуль в imports
    const routerModuleImport = 'RouterModule.register(routes),';
    updatedContent = updatedContent?.replace(routerModuleImport, `${routerModuleImport} ${className}Module,`);

    if (updatedContent !== content) {
      tree.overwrite(routingModulePath, String(updatedContent));
    }

    console.log(updatedContent);

    return tree;
  };
}

export function resource(options: Options): Rule {
  const targetPath = normalize(`${LAYER_PATHS[options.layer]}/${strings.dasherize(options.name)}/`);

  return chain([
    mergeWith(
      apply(url('./files'), [
        applyTemplates({
          classify: strings.classify,
          dasherize: strings.dasherize,
          camelize,
          name: options.name,
        }),
        move(targetPath),
      ]),
    ),
    updateRoutingModule(options),
  ]);
}
