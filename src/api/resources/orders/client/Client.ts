/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Webflow from "../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization/index";
import * as errors from "../../../../errors/index";

export declare namespace Orders {
    interface Options {
        environment?: core.Supplier<environments.WebflowEnvironment | string>;
        accessToken: core.Supplier<core.BearerToken>;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class Orders {
    constructor(protected readonly _options: Orders.Options) {}

    /**
     * List all orders created for a given site.
     *
     * Required scope | `ecommerce:read`
     *
     * @param {string} siteId - Unique identifier for a Site
     * @param {Webflow.OrdersListRequest} request
     * @param {Orders.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await client.orders.list("580e63e98c9a982ac9b8b741")
     */
    public async list(
        siteId: string,
        request: Webflow.OrdersListRequest = {},
        requestOptions?: Orders.RequestOptions
    ): Promise<Webflow.OrderList> {
        const { status, offset, limit } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (status != null) {
            _queryParams["status"] = status;
        }

        if (offset != null) {
            _queryParams["offset"] = offset.toString();
        }

        if (limit != null) {
            _queryParams["limit"] = limit.toString();
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${encodeURIComponent(siteId)}/orders`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.4.2",
                "User-Agent": "webflow-api/2.4.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.OrderList.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(
                        serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Retrieve a single product by its id. All of its SKUs will also be retrieved.
     *
     * Required scope | `ecommerce:read`
     *
     * @param {string} siteId - Unique identifier for a Site
     * @param {string} orderId - Unique identifier for an Order
     * @param {Orders.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await client.orders.get("580e63e98c9a982ac9b8b741", "5e8518516e147040726cc415")
     */
    public async get(siteId: string, orderId: string, requestOptions?: Orders.RequestOptions): Promise<Webflow.Order> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${encodeURIComponent(siteId)}/orders/${encodeURIComponent(orderId)}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.4.2",
                "User-Agent": "webflow-api/2.4.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.Order.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(
                        serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * This API lets you update the fields, `comment`, `shippingProvider`, and/or `shippingTracking` for a given order. All three fields can be updated simultaneously or independently.
     *
     * Required scope | `ecommerce:write`
     *
     * @param {string} siteId - Unique identifier for a Site
     * @param {string} orderId - Unique identifier for an Order
     * @param {Webflow.OrdersUpdateRequest} request
     * @param {Orders.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await client.orders.update("580e63e98c9a982ac9b8b741", "5e8518516e147040726cc415")
     */
    public async update(
        siteId: string,
        orderId: string,
        request: Webflow.OrdersUpdateRequest = {},
        requestOptions?: Orders.RequestOptions
    ): Promise<Webflow.Order> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${encodeURIComponent(siteId)}/orders/${encodeURIComponent(orderId)}`
            ),
            method: "PATCH",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.4.2",
                "User-Agent": "webflow-api/2.4.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.OrdersUpdateRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.Order.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(
                        serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updates an order's status to fulfilled
     *
     * Required scope | `ecommerce:write`
     *
     * @param {string} siteId - Unique identifier for a Site
     * @param {string} orderId - Unique identifier for an Order
     * @param {Webflow.OrdersUpdateFulfillRequest} request
     * @param {Orders.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await client.orders.updateFulfill("580e63e98c9a982ac9b8b741", "5e8518516e147040726cc415")
     */
    public async updateFulfill(
        siteId: string,
        orderId: string,
        request: Webflow.OrdersUpdateFulfillRequest = {},
        requestOptions?: Orders.RequestOptions
    ): Promise<Webflow.Order> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${encodeURIComponent(siteId)}/orders/${encodeURIComponent(orderId)}/fulfill`
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.4.2",
                "User-Agent": "webflow-api/2.4.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.OrdersUpdateFulfillRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.Order.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(
                        serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updates an order's status to unfulfilled
     *
     * Required scope | `ecommerce:write`
     *
     * @param {string} siteId - Unique identifier for a Site
     * @param {string} orderId - Unique identifier for an Order
     * @param {Orders.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await client.orders.updateUnfulfill("580e63e98c9a982ac9b8b741", "5e8518516e147040726cc415")
     */
    public async updateUnfulfill(
        siteId: string,
        orderId: string,
        requestOptions?: Orders.RequestOptions
    ): Promise<Webflow.Order> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${encodeURIComponent(siteId)}/orders/${encodeURIComponent(orderId)}/unfulfill`
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.4.2",
                "User-Agent": "webflow-api/2.4.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.Order.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(
                        serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * This API will reverse a Stripe charge and refund an order back to a
     * customer. It will also set the order's status to `refunded`.
     *
     * Required scope | `ecommerce:write`
     *
     * @param {string} siteId - Unique identifier for a Site
     * @param {string} orderId - Unique identifier for an Order
     * @param {Webflow.OrdersRefundRequest} request
     * @param {Orders.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await client.orders.refund("580e63e98c9a982ac9b8b741", "5e8518516e147040726cc415")
     */
    public async refund(
        siteId: string,
        orderId: string,
        request: Webflow.OrdersRefundRequest = {},
        requestOptions?: Orders.RequestOptions
    ): Promise<Webflow.Order> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${encodeURIComponent(siteId)}/orders/${encodeURIComponent(orderId)}/refund`
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.4.2",
                "User-Agent": "webflow-api/2.4.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.OrdersRefundRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.Order.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(
                        serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string> {
        return `Bearer ${await core.Supplier.get(this._options.accessToken)}`;
    }
}
