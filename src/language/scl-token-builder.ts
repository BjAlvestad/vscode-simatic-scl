import type { CustomPatternMatcherFunc, TokenPattern, TokenType, TokenVocabulary } from 'chevrotain';
import { DefaultTokenBuilder, Grammar, GrammarAST, isTokenTypeArray } from "langium";

export class SclTokenBuilder extends DefaultTokenBuilder {

    public override buildTokens(grammar: GrammarAST.Grammar, options?: { caseInsensitive?: boolean }): TokenVocabulary {
        const tokenTypes = super.buildTokens(grammar, options);
        
        if (isTokenTypeArray(tokenTypes)) {
            const commentStart = tokenTypes.find(token => token.name === 'ML_COMMENT_START')!;
            const commentEnd = tokenTypes.find(token => token.name === 'ML_COMMENT_END')!;
            const commentContent = tokenTypes.find(token => token.name === 'ML_COMMENT_CONTENT')!;

            commentStart.PUSH_MODE = 'comment';
            commentEnd.POP_MODE = true;
            const nonCommentTokens = tokenTypes.filter(token => token !== commentEnd && token !== commentContent);
            const commentTokens = [commentEnd, commentContent];

            return {
                modes: {
                    comment: commentTokens,
                    nonComment: nonCommentTokens
                },
                defaultMode: 'nonComment'
            };
        }
        
        return tokenTypes;

        // ----------------

        //     // Regular mode just drops template literal middle & end
        //     const regularModeTokens = tokenTypes
        //         .filter(token => !['TEMPLATE_LITERAL_MIDDLE','TEMPLATE_LITERAL_END'].includes(token.name));
        //     // Template mode needs to exclude the '}' keyword
        //     const templateModeTokens = tokenTypes
        //         .filter(token => !['}'].includes(token.name));

        //     const multiModeLexerDef: IMultiModeLexerDefinition = {
        //         modes: {
        //             [REGULAR_MODE]: regularModeTokens,
        //             [TEMPLATE_MODE]: templateModeTokens
        //         },
        //         defaultMode: REGULAR_MODE
        //     };
        //     return multiModeLexerDef;
        // } else {
        //     throw new Error('Invalid token vocabulary received from DefaultTokenBuilder!');
        // }

        // ----------------

    //   const commentStart = tokens.find(token => token.name === 'ML_COMMENT_START')!;
    //   const commentEnd = tokens.find(token => token.name === 'ML_COMMENT_END')!;
    //   const commentContent = tokens.find(token => token.name === 'ML_COMMENT_CONTENT')!;
    //   commentStart.PUSH_MODE = 'comment';
    //   commentEnd.POP_MODE = true;
    //   const nonCommentTokens = tokens.filter(token => token !== commentEnd && token !== commentContent);
    //   const commentTokens = [commentEnd, commentContent];
    //   return {
    //     modes: {
    //       comment: commentTokens,
    //       nonComment: nonCommentTokens
    //     },
    //     defaultMode: 'nonComment'
    //   };
    }

  }