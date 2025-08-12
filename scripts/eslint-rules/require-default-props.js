/**
 * Custom ESLint rule - "Require Default Props in Destructured Parameters" - Adapted for React Native
 *
 * Enforces that React functional components provide default values
 * for destructured props to avoid undefined values since defaultProps
 * are deprecated in React 18+.
 *
 * Adapted from web version for React Native mobile patterns:
 * - Added React Native specific prop names (navigation, route)
 * - Added mobile-specific default value suggestions
 * - Added support for navigation prop patterns common in React Navigation
 *
 * Detects functional components and ensures destructured props have defaults.
 */

/**
 * Check if a node contains JSX elements (basic detection)
 * @param {Object} node - AST node
 * @returns {boolean}
 */
function hasJSXElements(node) {
  if (!node) return false;

  if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
    return true;
  }

  // Check children recursively (simplified)
  if (node.type === 'ConditionalExpression') {
    return hasJSXElements(node.consequent) || hasJSXElements(node.alternate);
  }

  if (node.type === 'LogicalExpression') {
    return hasJSXElements(node.left) || hasJSXElements(node.right);
  }

  return false;
}

/**
 * Check if a function is likely a React component
 * @param {Object} node - Function AST node
 * @returns {boolean}
 */
function isReactComponent(node) {
  // Check if function name starts with uppercase (React component convention)
  if (node.id && node.id.name) {
    return /^[A-Z]/.test(node.id.name);
  }

  // For arrow functions assigned to variables
  if (node.parent && node.parent.type === 'VariableDeclarator' && node.parent.id.name) {
    return /^[A-Z]/.test(node.parent.id.name);
  }

  // Check if function returns JSX-like structure (basic heuristic)
  if (node.body && node.body.type === 'BlockStatement') {
    // Look for return statements with JSX
    const hasJSXReturn = node.body.body.some((statement) => {
      if (statement.type === 'ReturnStatement' && statement.argument) {
        return hasJSXElements(statement.argument);
      }
      return false;
    });
    return hasJSXReturn;
  }

  // For arrow functions with direct JSX return
  if (node.body && hasJSXElements(node.body)) {
    return true;
  }

  return false;
}

/**
 * Get destructured parameters from function parameters
 * @param {Array} params - Function parameters
 * @returns {Array} Array of destructured properties
 */
function getDestructuredProps(params) {
  const destructuredProps = [];

  for (const param of params) {
    if (param.type === 'ObjectPattern') {
      for (const property of param.properties) {
        if (property.type === 'Property' && property.key.type === 'Identifier') {
          destructuredProps.push({
            hasDefault: property.value.type === 'AssignmentPattern',
            name: property.key.name,
            node: property,
          });
        } else if (property.type === 'RestElement') {
          // Skip rest elements (...rest)
          continue;
        }
      }
    }
  }

  return destructuredProps;
}

/**
 * Check if a prop name should be excluded from validation
 * @param {string} propName - Name of the prop
 * @param {Array} excludedProps - Array of excluded prop names
 * @returns {boolean}
 */
function isExcludedProp(propName, excludedProps = []) {
  return excludedProps.includes(propName);
}

/**
 * Custom ESLint rule for requiring default values in destructured props - React Native adapted
 */
const requireDefaultPropsRule = {
  create(context) {
    const options = context.options[0] || {};
    const excludedProps = options.exclude || [
      'children',
      'className',
      'navigation',
      'route',
      'key',
      'ref',
      'params',
      'searchParams'
    ];
    const checkAllFunctions = options.checkAllFunctions || false;

    /**
     * Check function for destructured props without defaults
     * @param {Object} node - Function AST node
     */
    function checkFunction(node) {
      // Skip if not a React component (unless checkAllFunctions is true)
      if (!checkAllFunctions && !isReactComponent(node)) {
        return;
      }

      const destructuredProps = getDestructuredProps(node.params);

      if (destructuredProps.length === 0) {
        return;
      }

      // Check each destructured prop
      for (const prop of destructuredProps) {
        if (!prop.hasDefault && !isExcludedProp(prop.name, excludedProps)) {
          context.report({
            message: `Destructured prop '${prop.name}' should have a default value. Consider adding '${prop.name} = defaultValue' to avoid undefined values.`,
            node: prop.node,
            suggest: [
              {
                desc: `Add default value for '${prop.name}'`,
                fix(fixer) {
                  // React Native mobile specific default suggestions
                  const suggestedDefaults = {
                    // Common React Native props
                    active: 'false',
                    animated: 'false',
                    bounces: 'true',
                    count: '0',
                    data: '[]',
                    disabled: 'false',
                    horizontal: 'false',
                    id: "''",
                    index: '0',
                    items: '[]',
                    keyboardType: "'default'",
                    label: "''",
                    loading: 'false',
                    multiline: 'false',
                    name: "''",
                    numberOfLines: '1',
                    onBlur: '() => {}',
                    onChange: '() => {}',
                    onChangeText: '() => {}',
                    onClick: '() => {}',
                    onClose: '() => {}',
                    onEndReached: '() => {}',
                    onFocus: '() => {}',
                    onPress: '() => {}',
                    onRefresh: '() => {}',
                    onSubmit: '() => {}',
                    open: 'false',
                    options: '[]',
                    placeholder: "''",
                    refreshing: 'false',
                    scrollEnabled: 'true',
                    secureTextEntry: 'false',
                    selected: 'false',
                    showsHorizontalScrollIndicator: 'false',
                    showsVerticalScrollIndicator: 'false',
                    size: "'medium'",
                    style: '{}',
                    testID: "''",
                    text: "''",
                    title: "''",
                    type: "'button'",
                    value: "''",
                    variant: "'default'",
                    visible: 'true',
                    // React Navigation specific props
                    options: '{}',
                    // Theme related
                    theme: 'undefined',
                    colors: '{}',
                    // TouchableOpacity / TouchableHighlight props
                    activeOpacity: '0.7',
                    underlayColor: "'transparent'",
                    // Modal props
                    animationType: "'fade'",
                    transparent: 'false',
                    // FlatList props
                    numColumns: '1',
                    horizontal: 'false',
                    // Image props
                    resizeMode: "'cover'",
                    source: 'undefined',
                    // Text props
                    numberOfLines: 'undefined',
                    ellipsizeMode: "'tail'",
                  };

                  const defaultValue = suggestedDefaults[prop.name] || 'undefined';

                  // Replace the property key with key = default
                  return fixer.replaceText(prop.node.key, `${prop.name} = ${defaultValue}`);
                },
              },
            ],
          });
        }
      }
    }

    return {
      ArrowFunctionExpression: checkFunction,
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
    };
  },

  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Require default values for destructured props in React Native functional components',
      recommended: true,
    },
    fixable: null,
    hasSuggestions: true,
    schema: [
      {
        additionalProperties: false,
        properties: {
          checkAllFunctions: {
            description: 'Check all functions, not just React components',
            type: 'boolean',
          },
          exclude: {
            description: 'Array of prop names to exclude from validation (includes React Native specific props by default)',
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'problem',
  },
};

export { requireDefaultPropsRule };