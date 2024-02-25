import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(['en-EN', 'pl-PL']);

@Injectable()
export class LanguageExtractorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const acceptLanguageHeader = req.headers['accept-language'] || '';
    req['language'] = acceptLanguage.get(acceptLanguageHeader);
    next();
  }
}
