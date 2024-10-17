/*
 * COPYRIGHT (C) 2024 Frederic Bahr
 *
 * The PROGRAM is protected by national and international copyright laws and conventions.
 * The copyright lies with Frederic Bahr, unless expressly stated otherwise.
 * All rights reserved.
 * Especially the reproduction and distribution of the PROGRAM without written permission of
 * the copyright owner is prohibited.
 *
 * See LICENSE for licensing information.
 */

const httpOK = 200;
const httpCreated = 201;

const httpBadRequest = 400;
const httpUnauthorized = 401;
const httpNotFound = 404;

const httpIntServerError = 500;

/**
 * Object containing all used http status codes
 */
export const statusCodes = {
  httpOK,
  httpCreated,
  httpBadRequest,
  httpUnauthorized,
  httpNotFound,
  httpIntServerError,
};
