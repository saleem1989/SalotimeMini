/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as chars from './chars';
import { identifierModuleUrl, identifierName } from './compile_metadata';
export class ParseLocation {
    constructor(file, offset, line, col) {
        this.file = file;
        this.offset = offset;
        this.line = line;
        this.col = col;
    }
    toString() {
        return this.offset != null ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
    }
    moveBy(delta) {
        const source = this.file.content;
        const len = source.length;
        let offset = this.offset;
        let line = this.line;
        let col = this.col;
        while (offset > 0 && delta < 0) {
            offset--;
            delta++;
            const ch = source.charCodeAt(offset);
            if (ch == chars.$LF) {
                line--;
                const priorLine = source.substr(0, offset - 1).lastIndexOf(String.fromCharCode(chars.$LF));
                col = priorLine > 0 ? offset - priorLine : offset;
            }
            else {
                col--;
            }
        }
        while (offset < len && delta > 0) {
            const ch = source.charCodeAt(offset);
            offset++;
            delta--;
            if (ch == chars.$LF) {
                line++;
                col = 0;
            }
            else {
                col++;
            }
        }
        return new ParseLocation(this.file, offset, line, col);
    }
    // Return the source around the location
    // Up to `maxChars` or `maxLines` on each side of the location
    getContext(maxChars, maxLines) {
        const content = this.file.content;
        let startOffset = this.offset;
        if (startOffset != null) {
            if (startOffset > content.length - 1) {
                startOffset = content.length - 1;
            }
            let endOffset = startOffset;
            let ctxChars = 0;
            let ctxLines = 0;
            while (ctxChars < maxChars && startOffset > 0) {
                startOffset--;
                ctxChars++;
                if (content[startOffset] == '\n') {
                    if (++ctxLines == maxLines) {
                        break;
                    }
                }
            }
            ctxChars = 0;
            ctxLines = 0;
            while (ctxChars < maxChars && endOffset < content.length - 1) {
                endOffset++;
                ctxChars++;
                if (content[endOffset] == '\n') {
                    if (++ctxLines == maxLines) {
                        break;
                    }
                }
            }
            return {
                before: content.substring(startOffset, this.offset),
                after: content.substring(this.offset, endOffset + 1),
            };
        }
        return null;
    }
}
export class ParseSourceFile {
    constructor(content, url) {
        this.content = content;
        this.url = url;
    }
}
export class ParseSourceSpan {
    constructor(start, end, details = null) {
        this.start = start;
        this.end = end;
        this.details = details;
    }
    toString() {
        return this.start.file.content.substring(this.start.offset, this.end.offset);
    }
}
export var ParseErrorLevel;
(function (ParseErrorLevel) {
    ParseErrorLevel[ParseErrorLevel["WARNING"] = 0] = "WARNING";
    ParseErrorLevel[ParseErrorLevel["ERROR"] = 1] = "ERROR";
})(ParseErrorLevel || (ParseErrorLevel = {}));
export class ParseError {
    constructor(span, msg, level = ParseErrorLevel.ERROR) {
        this.span = span;
        this.msg = msg;
        this.level = level;
    }
    contextualMessage() {
        const ctx = this.span.start.getContext(100, 3);
        return ctx ? `${this.msg} ("${ctx.before}[${ParseErrorLevel[this.level]} ->]${ctx.after}")` :
            this.msg;
    }
    toString() {
        const details = this.span.details ? `, ${this.span.details}` : '';
        return `${this.contextualMessage()}: ${this.span.start}${details}`;
    }
}
export function typeSourceSpan(kind, type) {
    const moduleUrl = identifierModuleUrl(type);
    const sourceFileName = moduleUrl != null ? `in ${kind} ${identifierName(type)} in ${moduleUrl}` :
        `in ${kind} ${identifierName(type)}`;
    const sourceFile = new ParseSourceFile('', sourceFileName);
    return new ParseSourceSpan(new ParseLocation(sourceFile, -1, -1, -1), new ParseLocation(sourceFile, -1, -1, -1));
}
/**
 * Generates Source Span object for a given R3 Type for JIT mode.
 *
 * @param kind Component or Directive.
 * @param typeName name of the Component or Directive.
 * @param sourceUrl reference to Component or Directive source.
 * @returns instance of ParseSourceSpan that represent a given Component or Directive.
 */
export function r3JitTypeSourceSpan(kind, typeName, sourceUrl) {
    const sourceFileName = `in ${kind} ${typeName} in ${sourceUrl}`;
    const sourceFile = new ParseSourceFile('', sourceFileName);
    return new ParseSourceSpan(new ParseLocation(sourceFile, -1, -1, -1), new ParseLocation(sourceFile, -1, -1, -1));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9wYXJzZV91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sS0FBSyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBNEIsbUJBQW1CLEVBQUUsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFHbEcsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFDVyxJQUFxQixFQUFTLE1BQWMsRUFBUyxJQUFZLEVBQ2pFLEdBQVc7UUFEWCxTQUFJLEdBQUosSUFBSSxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ2pFLFFBQUcsR0FBSCxHQUFHLENBQVE7SUFBRyxDQUFDO0lBRTFCLFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUMzRixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWE7UUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixPQUFPLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENB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QUFtQixDQUMvQixJQUFZLEVBQUUsUUFBZ0IsRUFBRSxTQUFpQjtJQUNuRCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksSUFBSSxRQUFRLE9BQU8sU0FBUyxFQUFFLENBQUM7SUFDaEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzNELE9BQU8sSUFBSSxlQUFlLENBQ3RCLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIGNoYXJzIGZyb20gJy4vY2hhcnMnO1xuaW1wb3J0IHtDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLCBpZGVudGlmaWVyTW9kdWxlVXJsLCBpZGVudGlmaWVyTmFtZX0gZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7ZXJyb3J9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBQYXJzZUxvY2F0aW9uIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZmlsZTogUGFyc2VTb3VyY2VGaWxlLCBwdWJsaWMgb2Zmc2V0OiBudW1iZXIsIHB1YmxpYyBsaW5lOiBudW1iZXIsXG4gICAgICBwdWJsaWMgY29sOiBudW1iZXIpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vZmZzZXQgIT0gbnVsbCA/IGAke3RoaXMuZmlsZS51cmx9QCR7dGhpcy5saW5lfToke3RoaXMuY29sfWAgOiB0aGlzLmZpbGUudXJsO1xuICB9XG5cbiAgbW92ZUJ5KGRlbHRhOiBudW1iZXIpOiBQYXJzZUxvY2F0aW9uIHtcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmZpbGUuY29udGVudDtcbiAgICBjb25zdCBsZW4gPSBzb3VyY2UubGVuZ3RoO1xuICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICBsZXQgbGluZSA9IHRoaXMubGluZTtcbiAgICBsZXQgY29sID0gdGhpcy5jb2w7XG4gICAgd2hpbGUgKG9mZnNldCA+IDAgJiYgZGVsdGEgPCAwKSB7XG4gICAgICBvZmZzZXQtLTtcbiAgICAgIGRlbHRhKys7XG4gICAgICBjb25zdCBjaCA9IHNvdXJjZS5jaGFyQ29kZUF0KG9mZnNldCk7XG4gICAgICBpZiAoY2ggPT0gY2hhcnMuJExGKSB7XG4gICAgICAgIGxpbmUtLTtcbiAgICAgICAgY29uc3QgcHJpb3JMaW5lID0gc291cmNlLnN1YnN0cigwLCBvZmZzZXQgLSAxKS5sYXN0SW5kZXhPZihTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJzLiRMRikpO1xuICAgICAgICBjb2wgPSBwcmlvckxpbmUgPiAwID8gb2Zmc2V0IC0gcHJpb3JMaW5lIDogb2Zmc2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sLS07XG4gICAgICB9XG4gICAgfVxuICAgIHdoaWxlIChvZmZzZXQgPCBsZW4gJiYgZGVsdGEgPiAwKSB7XG4gICAgICBjb25zdCBjaCA9IHNvdXJjZS5jaGFyQ29kZUF0KG9mZnNldCk7XG4gICAgICBvZmZzZXQrKztcbiAgICAgIGRlbHRhLS07XG4gICAgICBpZiAoY2ggPT0gY2hhcnMuJExGKSB7XG4gICAgICAgIGxpbmUrKztcbiAgICAgICAgY29sID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbCsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFBhcnNlTG9jYXRpb24odGhpcy5maWxlLCBvZmZzZXQsIGxpbmUsIGNvbCk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHNvdXJjZSBhcm91bmQgdGhlIGxvY2F0aW9uXG4gIC8vIFVwIHRvIGBtYXhDaGFyc2Agb3IgYG1heExpbmVzYCBvbiBlYWNoIHNpZGUgb2YgdGhlIGxvY2F0aW9uXG4gIGdldENvbnRleHQobWF4Q2hhcnM6IG51bWJlciwgbWF4TGluZXM6IG51bWJlcik6IHtiZWZvcmU6IHN0cmluZywgYWZ0ZXI6IHN0cmluZ318bnVsbCB7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZmlsZS5jb250ZW50O1xuICAgIGxldCBzdGFydE9mZnNldCA9IHRoaXMub2Zmc2V0O1xuXG4gICAgaWYgKHN0YXJ0T2Zmc2V0ICE9IG51bGwpIHtcbiAgICAgIGlmIChzdGFydE9mZnNldCA+IGNvbnRlbnQubGVuZ3RoIC0gMSkge1xuICAgICAgICBzdGFydE9mZnNldCA9IGNvbnRlbnQubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIGxldCBlbmRPZmZzZXQgPSBzdGFydE9mZnNldDtcbiAgICAgIGxldCBjdHhDaGFycyA9IDA7XG4gICAgICBsZXQgY3R4TGluZXMgPSAwO1xuXG4gICAgICB3aGlsZSAoY3R4Q2hhcnMgPCBtYXhDaGFycyAmJiBzdGFydE9mZnNldCA+IDApIHtcbiAgICAgICAgc3RhcnRPZmZzZXQtLTtcbiAgICAgICAgY3R4Q2hhcnMrKztcbiAgICAgICAgaWYgKGNvbnRlbnRbc3RhcnRPZmZzZXRdID09ICdcXG4nKSB7XG4gICAgICAgICAgaWYgKCsrY3R4TGluZXMgPT0gbWF4TGluZXMpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjdHhDaGFycyA9IDA7XG4gICAgICBjdHhMaW5lcyA9IDA7XG4gICAgICB3aGlsZSAoY3R4Q2hhcnMgPCBtYXhDaGFycyAmJiBlbmRPZmZzZXQgPCBjb250ZW50Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgZW5kT2Zmc2V0Kys7XG4gICAgICAgIGN0eENoYXJzKys7XG4gICAgICAgIGlmIChjb250ZW50W2VuZE9mZnNldF0gPT0gJ1xcbicpIHtcbiAgICAgICAgICBpZiAoKytjdHhMaW5lcyA9PSBtYXhMaW5lcykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJlZm9yZTogY29udGVudC5zdWJzdHJpbmcoc3RhcnRPZmZzZXQsIHRoaXMub2Zmc2V0KSxcbiAgICAgICAgYWZ0ZXI6IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMub2Zmc2V0LCBlbmRPZmZzZXQgKyAxKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlU291cmNlRmlsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZW50OiBzdHJpbmcsIHB1YmxpYyB1cmw6IHN0cmluZykge31cbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlU291cmNlU3BhbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHN0YXJ0OiBQYXJzZUxvY2F0aW9uLCBwdWJsaWMgZW5kOiBQYXJzZUxvY2F0aW9uLCBwdWJsaWMgZGV0YWlsczogc3RyaW5nfG51bGwgPSBudWxsKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnQuZmlsZS5jb250ZW50LnN1YnN0cmluZyh0aGlzLnN0YXJ0Lm9mZnNldCwgdGhpcy5lbmQub2Zmc2V0KTtcbiAgfVxufVxuXG5leHBvcnQgZW51bSBQYXJzZUVycm9yTGV2ZWwge1xuICBXQVJOSU5HLFxuICBFUlJPUixcbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBtc2c6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBsZXZlbDogUGFyc2VFcnJvckxldmVsID0gUGFyc2VFcnJvckxldmVsLkVSUk9SKSB7fVxuXG4gIGNvbnRleHR1YWxNZXNzYWdlKCk6IHN0cmluZyB7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5zcGFuLnN0YXJ0LmdldENvbnRleHQoMTAwLCAzKTtcbiAgICByZXR1cm4gY3R4ID8gYCR7dGhpcy5tc2d9IChcIiR7Y3R4LmJlZm9yZX1bJHtQYXJzZUVycm9yTGV2ZWxbdGhpcy5sZXZlbF19IC0+XSR7Y3R4LmFmdGVyfVwiKWAgOlxuICAgICAgICAgICAgICAgICB0aGlzLm1zZztcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZGV0YWlscyA9IHRoaXMuc3Bhbi5kZXRhaWxzID8gYCwgJHt0aGlzLnNwYW4uZGV0YWlsc31gIDogJyc7XG4gICAgcmV0dXJuIGAke3RoaXMuY29udGV4dHVhbE1lc3NhZ2UoKX06ICR7dGhpcy5zcGFuLnN0YXJ0fSR7ZGV0YWlsc31gO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlU291cmNlU3BhbihraW5kOiBzdHJpbmcsIHR5cGU6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEpOiBQYXJzZVNvdXJjZVNwYW4ge1xuICBjb25zdCBtb2R1bGVVcmwgPSBpZGVudGlmaWVyTW9kdWxlVXJsKHR5cGUpO1xuICBjb25zdCBzb3VyY2VGaWxlTmFtZSA9IG1vZHVsZVVybCAhPSBudWxsID8gYGluICR7a2luZH0gJHtpZGVudGlmaWVyTmFtZSh0eXBlKX0gaW4gJHttb2R1bGVVcmx9YCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgaW4gJHtraW5kfSAke2lkZW50aWZpZXJOYW1lKHR5cGUpfWA7XG4gIGNvbnN0IHNvdXJjZUZpbGUgPSBuZXcgUGFyc2VTb3VyY2VGaWxlKCcnLCBzb3VyY2VGaWxlTmFtZSk7XG4gIHJldHVybiBuZXcgUGFyc2VTb3VyY2VTcGFuKFxuICAgICAgbmV3IFBhcnNlTG9jYXRpb24oc291cmNlRmlsZSwgLTEsIC0xLCAtMSksIG5ldyBQYXJzZUxvY2F0aW9uKHNvdXJjZUZpbGUsIC0xLCAtMSwgLTEpKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgU291cmNlIFNwYW4gb2JqZWN0IGZvciBhIGdpdmVuIFIzIFR5cGUgZm9yIEpJVCBtb2RlLlxuICpcbiAqIEBwYXJhbSBraW5kIENvbXBvbmVudCBvciBEaXJlY3RpdmUuXG4gKiBAcGFyYW0gdHlwZU5hbWUgbmFtZSBvZiB0aGUgQ29tcG9uZW50IG9yIERpcmVjdGl2ZS5cbiAqIEBwYXJhbSBzb3VyY2VVcmwgcmVmZXJlbmNlIHRvIENvbXBvbmVudCBvciBEaXJlY3RpdmUgc291cmNlLlxuICogQHJldHVybnMgaW5zdGFuY2Ugb2YgUGFyc2VTb3VyY2VTcGFuIHRoYXQgcmVwcmVzZW50IGEgZ2l2ZW4gQ29tcG9uZW50IG9yIERpcmVjdGl2ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHIzSml0VHlwZVNvdXJjZVNwYW4oXG4gICAga2luZDogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nLCBzb3VyY2VVcmw6IHN0cmluZyk6IFBhcnNlU291cmNlU3BhbiB7XG4gIGNvbnN0IHNvdXJjZUZpbGVOYW1lID0gYGluICR7a2luZH0gJHt0eXBlTmFtZX0gaW4gJHtzb3VyY2VVcmx9YDtcbiAgY29uc3Qgc291cmNlRmlsZSA9IG5ldyBQYXJzZVNvdXJjZUZpbGUoJycsIHNvdXJjZUZpbGVOYW1lKTtcbiAgcmV0dXJuIG5ldyBQYXJzZVNvdXJjZVNwYW4oXG4gICAgICBuZXcgUGFyc2VMb2NhdGlvbihzb3VyY2VGaWxlLCAtMSwgLTEsIC0xKSwgbmV3IFBhcnNlTG9jYXRpb24oc291cmNlRmlsZSwgLTEsIC0xLCAtMSkpO1xufSJdfQ==