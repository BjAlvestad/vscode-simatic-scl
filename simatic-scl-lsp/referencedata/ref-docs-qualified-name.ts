// https://langium.org/guides/scoping/qualified-name/

export class CppScopeComputation extends DefaultScopeComputation {

    /**
     * Export all functions using their fully qualified name
     */
    override async computeExports(document: LangiumDocument): Promise<AstNodeDescription[]> {
        const exportedDescriptions: AstNodeDescription[] = [];
        for (const childNode of streamAllContents(document.parseResult.value)) {
            if (isFunctionDeclaration(childNode)) {
                const fullyQualifiedName = this.getQualifiedName(childNode, childNode.name);
                // `descriptions` is our `AstNodeDescriptionProvider` defined in `DefaultScopeComputation`
                // It allows us to easily create descriptions that point to elements using a name.
                exportedDescriptions.push(this.descriptions.createDescription(modelNode, fullyQualifiedName, document));
            }
        }
        return exportedDescriptions;
    }

    override async computeLocalScopes(document: LangiumDocument): Promise<PrecomputedScopes> {
        const model = document.parseResult.value as CppProgram;
        // This multi-map stores a list of descriptions for each node in our document
        const scopes = new MultiMap<AstNode, AstNodeDescription>();
        this.processContainer(model, scopes, document);
        return scopes;
    }

    private processContainer(
        container: CppProgram | Namespace, 
        scopes: PrecomputedScopes, 
        document: LangiumDocument
    ): AstNodeDescription[] {
        const localDescriptions: AstNodeDescription[] = [];
        for (const element of container.elements) {
            if (isFunctionDeclaration(element)) {
                // Create a simple local name for the function
                const description = this.descriptions.createDescription(element, element.name, document);
                localDescriptions.push(description);
            } else if (isNamespace(element)) {
                const nestedDescriptions = this.processContainer(element, scopes, document, cancelToken);
                for (const description of nestedDescriptions) {
                    // Add qualified names to the container
                    // This could also be a partially qualified name
                    const qualified = this.createQualifiedDescription(element, description, document);
                    localDescriptions.push(qualified);
                }
            }
        }
        scopes.addAll(container, localDescriptions);
        return localDescriptions;
    }

    private createQualifiedDescription(
        container: Namespace, 
        description: AstNodeDescription, 
        document: LangiumDocument
    ): AstNodeDescription {
        const name = this.getQualifiedName(container.name, description.name);
        return this.descriptions.createDescription(description.node!, name, document);
    }

    /**
     * Build a qualified name for a model node
     */
    private getQualifiedName(node: AstNode, name: string): string {
        let parent: AstNode | undefined = node.$container;
        while (isNamespace(parent)) {
            // Iteratively prepend the name of the parent namespace
            // This allows us to work with nested namespaces
            name = `${parent.name}::${name}`;
            parent = parent.$container;
        }
        return name;
    }
}