/*
 * COPYRIGHT (C) 2023 Frederic Bahr
 *
 * The PROGRAM is protected by national and international copyright laws and conventions.
 * The copyright lies with Frederic Bahr, unless expressly stated otherwise.
 * All rights reserved.
 * Especially the reproduction and distribution of the PROGRAM without written permission of
 * the copyright owner is prohibited.
 *
 * See LICENSE for licensing information.
 */

import rateLimiter, { RateLimitRequestHandler } from "express-rate-limit";

const maxAPIRequestsPerMinute = 10;

/**
 * Limits the amount of requests per second to the API with 5 requests per second.
 */
export const limiter: RateLimitRequestHandler = rateLimiter({
  max: maxAPIRequestsPerMinute,
  windowMs: 1 * 1000, // 1 seconds
  message: `Du hast ${maxAPIRequestsPerMinute} Requests in 10 Sekunden erreicht. Bitte versuche es später erneut.`,
  standardHeaders: true,
});
