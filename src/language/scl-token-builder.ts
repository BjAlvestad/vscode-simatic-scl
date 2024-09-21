import type { IMultiModeLexerDefinition, TokenType, TokenVocabulary } from 'chevrotain';
import { DefaultTokenBuilder, GrammarAST, isTokenTypeArray } from "langium";

const REGULAR_MODE  = 'regular_mode';
const COMMENT_MODE  = 'comment_mode';

export class SclTokenBuilder extends DefaultTokenBuilder {

    public override buildTokens(grammar: GrammarAST.Grammar, options?: { caseInsensitive?: boolean }): TokenVocabulary {
        const tokenTypes = super.buildTokens(grammar, options);

        if(isTokenTypeArray(tokenTypes)) {
            // Regular mode just drops middle and end of multi line comment
            const regularModeTokens = tokenTypes
                .filter(token => !['ML_COMMENT_CONTENT', 'ML_COMMENT_END'].includes(token.name));
            // Comment mode only needs to include the comment start (for nested comments), and comment content and end
            const commentModeTokens = tokenTypes
                .filter(token => ['ML_COMMENT_START', 'ML_COMMENT_CONTENT', 'ML_COMMENT_END'].includes(token.name));

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
        
        // The IF sentence below is commented out, since `*` got added as a terminal instead of keyword
        // If it is used as keyword instead, we would need to delete the LONGER_ALT from it, since `*)` cannot be used in
        // regularModeTokens now that we are using it in commentModeTokens.
        // if (tokenType.name === '*') {
        //     // The default * token will use [ML_COMMENT_END] as longer alts (since that also starts with *)
        //     // We need to delete the LONGER_ALT, they are not valid for the regular lexer mode
        //     delete tokenType.LONGER_ALT;
        // }
        return tokenType;
    }

    protected override buildTerminalToken(terminal: GrammarAST.TerminalRule): TokenType {
        let tokenType = super.buildTerminalToken(terminal);

        // Update token types to enter & exit multi-line comment mode
        if(tokenType.name === 'ML_COMMENT_START') {
            tokenType.PUSH_MODE = COMMENT_MODE;
        } else if(tokenType.name === 'ML_COMMENT_END') {
            tokenType.POP_MODE = true;
        }
        return tokenType;
    }
  }