/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierName } from '../compile_metadata';
import * as o from '../output/output_ast';
import { error } from '../util';
import { compileFactoryFunction, dependenciesFromGlobalMetadata } from './r3_factory';
import { Identifiers as R3 } from './r3_identifiers';
import { typeWithParameters } from './util';
export function compilePipeFromMetadata(metadata) {
    const definitionMapValues = [];
    // e.g. `name: 'myPipe'`
    definitionMapValues.push({ key: 'name', value: o.literal(metadata.pipeName), quoted: false });
    // e.g. `type: MyPipe`
    definitionMapValues.push({ key: 'type', value: metadata.type, quoted: false });
    const templateFactory = compileFactoryFunction({
        name: metadata.name,
        type: metadata.type,
        deps: metadata.deps,
        injectFn: R3.directiveInject,
    });
    definitionMapValues.push({ key: 'factory', value: templateFactory.factory, quoted: false });
    // e.g. `pure: true`
    definitionMapValues.push({ key: 'pure', value: o.literal(metadata.pure), quoted: false });
    const expression = o.importExpr(R3.definePipe).callFn([o.literalMap(definitionMapValues)]);
    const type = new o.ExpressionType(o.importExpr(R3.PipeDefWithMeta, [
        typeWithParameters(metadata.type, metadata.typeArgumentCount),
        new o.ExpressionType(new o.LiteralExpr(metadata.pipeName)),
    ]));
    return { expression, type, statements: templateFactory.statements };
}
/**
 * Write a pipe definition to the output context.
 */
export function compilePipeFromRender2(outputCtx, pipe, reflector) {
    const definitionMapValues = [];
    const name = identifierName(pipe.type);
    if (!name) {
        return error(`Cannot resolve the name of ${pipe.type}`);
    }
    const metadata = {
        name,
        pipeName: pipe.name,
        type: outputCtx.importExpr(pipe.type.reference),
        typeArgumentCount: 0,
        deps: dependenciesFromGlobalMetadata(pipe.type, outputCtx, reflector),
        pure: pipe.pure,
    };
    const res = compilePipeFromMetadata(metadata);
    const definitionField = outputCtx.constantPool.propertyNameOf(3 /* Pipe */);
    outputCtx.statements.push(new o.ClassStmt(
    /* name */ name, 
    /* parent */ null, 
    /* fields */ [new o.ClassField(
        /* name */ definitionField, 
        /* type */ o.INFERRED_TYPE, 
        /* modifiers */ [o.StmtModifier.Static], 
        /* initializer */ res.expression)], 
    /* getters */ [], 
    /* constructorMethod */ new o.ClassMethod(null, [], []), 
    /* methods */ []));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfcGlwZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX3BpcGVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFzQixjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUd4RSxPQUFPLEtBQUssQ0FBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFDLE9BQU8sRUFBZ0IsS0FBSyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdDLE9BQU8sRUFBdUIsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUcsT0FBTyxFQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFrQzFDLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxRQUF3QjtJQUM5RCxNQUFNLG1CQUFtQixHQUEwRCxFQUFFLENBQUM7SUFFdEYsd0JBQXdCO0lBQ3hCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRTVGLHNCQUFzQjtJQUN0QixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRTdFLE1BQU0sZUFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQzdDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7UUFDbkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1FBQ25CLFFBQVEsRUFBRSxFQUFFLENBQUMsZUFBZTtLQUM3QixDQUFDLENBQUM7SUFDSCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRTFGLG9CQUFvQjtJQUNwQixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUV4RixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUU7UUFDakUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFDN0QsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDM0QsQ0FBQyxDQUFDLENBQUM7SUFDSixPQUFPLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLFVBQVUsRUFBQyxDQUFDO0FBQ3BFLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FDbEMsU0FBd0IsRUFBRSxJQUF5QixFQUFFLFNBQTJCO0lBQ2xGLE1BQU0sbUJBQW1CLEdBQTBELEVBQUUsQ0FBQztJQUV0RixNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFFRCxNQUFNLFFBQVEsR0FBbUI7UUFDL0IsSUFBSTtRQUNKLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNuQixJQUFJLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLElBQUksRUFBRSw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7UUFDckUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0tBQ2hCLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU5QyxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLGNBQWMsY0FBcUIsQ0FBQztJQUVuRixTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTO0lBQ3JDLFVBQVUsQ0FBQyxJQUFJO0lBQ2YsWUFBWSxDQUFDLElBQUk7SUFDakIsWUFBWSxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVTtRQUN6QixVQUFVLENBQUMsZUFBZTtRQUMxQixVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWE7UUFDMUIsZUFBZSxDQUFBLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDdEMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLGFBQWEsQ0FBQSxFQUFFO0lBQ2YsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3ZELGFBQWEsQ0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZVBpcGVNZXRhZGF0YSwgaWRlbnRpZmllck5hbWV9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDb21waWxlUmVmbGVjdG9yfSBmcm9tICcuLi9jb21waWxlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0RlZmluaXRpb25LaW5kfSBmcm9tICcuLi9jb25zdGFudF9wb29sJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0LCBlcnJvcn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7UjNEZXBlbmRlbmN5TWV0YWRhdGEsIGNvbXBpbGVGYWN0b3J5RnVuY3Rpb24sIGRlcGVuZGVuY2llc0Zyb21HbG9iYWxNZXRhZGF0YX0gZnJvbSAnLi9yM19mYWN0b3J5JztcbmltcG9ydCB7SWRlbnRpZmllcnMgYXMgUjN9IGZyb20gJy4vcjNfaWRlbnRpZmllcnMnO1xuaW1wb3J0IHt0eXBlV2l0aFBhcmFtZXRlcnN9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNQaXBlTWV0YWRhdGEge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgcGlwZSB0eXBlLlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyBhIHJlZmVyZW5jZSB0byB0aGUgcGlwZSBpdHNlbGYuXG4gICAqL1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBnZW5lcmljIHR5cGUgcGFyYW1ldGVycyBvZiB0aGUgdHlwZSBpdHNlbGYuXG4gICAqL1xuICB0eXBlQXJndW1lbnRDb3VudDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBwaXBlLlxuICAgKi9cbiAgcGlwZU5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogRGVwZW5kZW5jaWVzIG9mIHRoZSBwaXBlJ3MgY29uc3RydWN0b3IuXG4gICAqL1xuICBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdfG51bGw7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHBpcGUgaXMgbWFya2VkIGFzIHB1cmUuXG4gICAqL1xuICBwdXJlOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVBpcGVGcm9tTWV0YWRhdGEobWV0YWRhdGE6IFIzUGlwZU1ldGFkYXRhKSB7XG4gIGNvbnN0IGRlZmluaXRpb25NYXBWYWx1ZXM6IHtrZXk6IHN0cmluZywgcXVvdGVkOiBib29sZWFuLCB2YWx1ZTogby5FeHByZXNzaW9ufVtdID0gW107XG5cbiAgLy8gZS5nLiBgbmFtZTogJ215UGlwZSdgXG4gIGRlZmluaXRpb25NYXBWYWx1ZXMucHVzaCh7a2V5OiAnbmFtZScsIHZhbHVlOiBvLmxpdGVyYWwobWV0YWRhdGEucGlwZU5hbWUpLCBxdW90ZWQ6IGZhbHNlfSk7XG5cbiAgLy8gZS5nLiBgdHlwZTogTXlQaXBlYFxuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ3R5cGUnLCB2YWx1ZTogbWV0YWRhdGEudHlwZSwgcXVvdGVkOiBmYWxzZX0pO1xuXG4gIGNvbnN0IHRlbXBsYXRlRmFjdG9yeSA9IGNvbXBpbGVGYWN0b3J5RnVuY3Rpb24oe1xuICAgIG5hbWU6IG1ldGFkYXRhLm5hbWUsXG4gICAgdHlwZTogbWV0YWRhdGEudHlwZSxcbiAgICBkZXBzOiBtZXRhZGF0YS5kZXBzLFxuICAgIGluamVjdEZuOiBSMy5kaXJlY3RpdmVJbmplY3QsXG4gIH0pO1xuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ2ZhY3RvcnknLCB2YWx1ZTogdGVtcGxhdGVGYWN0b3J5LmZhY3RvcnksIHF1b3RlZDogZmFsc2V9KTtcblxuICAvLyBlLmcuIGBwdXJlOiB0cnVlYFxuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ3B1cmUnLCB2YWx1ZTogby5saXRlcmFsKG1ldGFkYXRhLnB1cmUpLCBxdW90ZWQ6IGZhbHNlfSk7XG5cbiAgY29uc3QgZXhwcmVzc2lvbiA9IG8uaW1wb3J0RXhwcihSMy5kZWZpbmVQaXBlKS5jYWxsRm4oW28ubGl0ZXJhbE1hcChkZWZpbml0aW9uTWFwVmFsdWVzKV0pO1xuICBjb25zdCB0eXBlID0gbmV3IG8uRXhwcmVzc2lvblR5cGUoby5pbXBvcnRFeHByKFIzLlBpcGVEZWZXaXRoTWV0YSwgW1xuICAgIHR5cGVXaXRoUGFyYW1ldGVycyhtZXRhZGF0YS50eXBlLCBtZXRhZGF0YS50eXBlQXJndW1lbnRDb3VudCksXG4gICAgbmV3IG8uRXhwcmVzc2lvblR5cGUobmV3IG8uTGl0ZXJhbEV4cHIobWV0YWRhdGEucGlwZU5hbWUpKSxcbiAgXSkpO1xuICByZXR1cm4ge2V4cHJlc3Npb24sIHR5cGUsIHN0YXRlbWVudHM6IHRlbXBsYXRlRmFjdG9yeS5zdGF0ZW1lbnRzfTtcbn1cblxuLyoqXG4gKiBXcml0ZSBhIHBpcGUgZGVmaW5pdGlvbiB0byB0aGUgb3V0cHV0IGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlUGlwZUZyb21SZW5kZXIyKFxuICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgcGlwZTogQ29tcGlsZVBpcGVNZXRhZGF0YSwgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yKSB7XG4gIGNvbnN0IGRlZmluaXRpb25NYXBWYWx1ZXM6IHtrZXk6IHN0cmluZywgcXVvdGVkOiBib29sZWFuLCB2YWx1ZTogby5FeHByZXNzaW9ufVtdID0gW107XG5cbiAgY29uc3QgbmFtZSA9IGlkZW50aWZpZXJOYW1lKHBpcGUudHlwZSk7XG4gIGlmICghbmFtZSkge1xuICAgIHJldHVybiBlcnJvcihgQ2Fubm90IHJlc29sdmUgdGhlIG5hbWUgb2YgJHtwaXBlLnR5cGV9YCk7XG4gIH1cblxuICBjb25zdCBtZXRhZGF0YTogUjNQaXBlTWV0YWRhdGEgPSB7XG4gICAgbmFtZSxcbiAgICBwaXBlTmFtZTogcGlwZS5uYW1lLFxuICAgIHR5cGU6IG91dHB1dEN0eC5pbXBvcnRFeHByKHBpcGUudHlwZS5yZWZlcmVuY2UpLFxuICAgIHR5cGVBcmd1bWVudENvdW50OiAwLFxuICAgIGRlcHM6IGRlcGVuZGVuY2llc0Zyb21HbG9iYWxNZXRhZGF0YShwaXBlLnR5cGUsIG91dHB1dEN0eCwgcmVmbGVjdG9yKSxcbiAgICBwdXJlOiBwaXBlLnB1cmUsXG4gIH07XG5cbiAgY29uc3QgcmVzID0gY29tcGlsZVBpcGVGcm9tTWV0YWRhdGEobWV0YWRhdGEpO1xuXG4gIGNvbnN0IGRlZmluaXRpb25GaWVsZCA9IG91dHB1dEN0eC5jb25zdGFudFBvb2wucHJvcGVydHlOYW1lT2YoRGVmaW5pdGlvbktpbmQuUGlwZSk7XG5cbiAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChuZXcgby5DbGFzc1N0bXQoXG4gICAgICAvKiBuYW1lICovIG5hbWUsXG4gICAgICAvKiBwYXJlbnQgKi8gbnVsbCxcbiAgICAgIC8qIGZpZWxkcyAqL1tuZXcgby5DbGFzc0ZpZWxkKFxuICAgICAgICAgIC8qIG5hbWUgKi8gZGVmaW5pdGlvbkZpZWxkLFxuICAgICAgICAgIC8qIHR5cGUgKi8gby5JTkZFUlJFRF9UWVBFLFxuICAgICAgICAgIC8qIG1vZGlmaWVycyAqL1tvLlN0bXRNb2RpZmllci5TdGF0aWNdLFxuICAgICAgICAgIC8qIGluaXRpYWxpemVyICovIHJlcy5leHByZXNzaW9uKV0sXG4gICAgICAvKiBnZXR0ZXJzICovW10sXG4gICAgICAvKiBjb25zdHJ1Y3Rvck1ldGhvZCAqLyBuZXcgby5DbGFzc01ldGhvZChudWxsLCBbXSwgW10pLFxuICAgICAgLyogbWV0aG9kcyAqL1tdKSk7XG59XG4iXX0=