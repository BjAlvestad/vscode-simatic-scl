import type { CustomPatternMatcherFunc, TokenPattern, IMultiModeLexerDefinition, TokenType, TokenVocabulary } from 'chevrotain';
import { DefaultTokenBuilder, Grammar, GrammarAST, isTokenTypeArray } from "langium";

const REGULAR_MODE  = 'regular_mode';
const COMMENT_MODE  = 'comment_mode';

export class SclTokenBuilder extends DefaultTokenBuilder {

    public override buildTokens(grammar: GrammarAST.Grammar, options?: { caseInsensitive?: boolean }): TokenVocabulary {
        const tokenTypes = super.buildTokens(grammar, options);

        if(isTokenTypeArray(tokenTypes)) {
            // Regular mode just drops template literal middle & end
            const regularModeTokens = tokenTypes
                .filter(token => !['ML_COMMENT_MIDDLE','ML_COMMENT_END'].includes(token.name));
            // Template mode needs to exclude the '}' keyword
            const commentModeTokens = tokenTypes
                .filter(token => !['*', '('].includes(token.name));

            const multiModeLexerDef: IMultiModeLexerDefinition = {
                modes: {
                    [REGULAR_MODE]: regularModeTokens,
                    [COMMENT_MODE]: commentModeTokens
                },
                defaultMode: REGULAR_MODE
            };
            return multiModeLexerDef;
        } else {
            throw new Error('Invalid token vocabulary received from DefaultTokenBuilder!');
        }
    }

    protected override buildKeywordToken(
        keyword: GrammarAST.Keyword,
        terminalTokens: TokenType[],
        caseInsensitive: boolean
    ): TokenType {
        let tokenType = super.buildKeywordToken(keyword, terminalTokens, caseInsensitive);
        
        if (tokenType.name === '*' || tokenType.name === '(') {
            // The default } token will use [TEMPLATE_LITERAL_MIDDLE, TEMPLATE_LITERAL_END] as longer alts
            // We need to delete the LONGER_ALT, they are not valid for the regular lexer mode
            delete tokenType.LONGER_ALT;
        }
        return tokenType;
    }

    protected override buildTerminalToken(terminal: GrammarAST.TerminalRule): TokenType {
        let tokenType = super.buildTerminalToken(terminal);

        // Update token types to enter & exit template mode
        if(tokenType.name === 'ML_COMMENT_START') {
            tokenType.PUSH_MODE = COMMENT_MODE;
        } else if(tokenType.name === 'ML_COMMENT_END') {
            tokenType.POP_MODE = true;
        }
        return tokenType;
    }


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