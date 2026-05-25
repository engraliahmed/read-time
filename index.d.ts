/**
 * Options for customizing the format of the output.
 */
export interface ReadTimeOptions {
    /**
     * The format of the output. 
     * - `standard`: "X min read" (default)
     * - `coffee`: "☕ X min read"
     * - `hourglass`: "⏳ X mins"
     * - `raw`: Returns an object with minutes and seconds.
     */
    format?: 'standard' | 'coffee' | 'hourglass' | 'raw';
}

/**
 * The raw output format when options.format = 'raw'.
 */
export interface ReadTimeRawOutput {
    seconds: number;
    minutes: number;
}

/**
 * Calculates the estimated reading time of an HTML string.
 * @param contentString The content to parse (HTML, Markdown, or Plain Text).
 * @param options Configuration options for formatting.
 * @returns The formatted reading time string or raw object.
 */
export function estimateReadTime(contentString: string, options?: { format: 'raw' }): ReadTimeRawOutput;
export function estimateReadTime(contentString: string, options?: Omit<ReadTimeOptions, 'format'> & { format?: 'standard' | 'coffee' | 'hourglass' }): string;
export function estimateReadTime(contentString: string, options?: ReadTimeOptions): string | ReadTimeRawOutput;
