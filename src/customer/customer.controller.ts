import { Controller, Get, Post, Body, Logger, Put, InternalServerErrorException, Delete, Query, Res, Param } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddCustomerDto, CustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';
import { Response } from 'express';
@ApiTags('customer')
@Controller('api/customer')
export class CustomerController {
    private readonly logger = new Logger(this.constructor.name)
    constructor(private readonly customerService: CustomerService) { }


    @Get('getall_customer')
    @ApiQuery({
        name: "name",
        type: String,
        description: "Enter user name",
        required: false
    })
    async GetcutomerData(@Query('name') id: string) {
        try {
            return await this.customerService.cutomerGetData(id)
        } catch (err) {
            const a = {
                err: err.toString(),
            }
            this.logger.error(JSON.stringify(a, null, ' '))
            throw new InternalServerErrorException()
        }
    }

    // @Get('getall_customer')
    // async GetcutomerData() {
    //     try {
    //         return await this.customerService.cutomerGetData()
    //     } catch (err) {
    //         const a = {
    //             err: err.toString(),
    //         }
    //         this.logger.error(JSON.stringify(a, null, ' '))
    //         throw new InternalServerErrorException()
    //     }
    // }

    @ApiResponse({
        status: 201,
        schema: {
            properties: {
                message: { type: 'string', default: 'Success' },
            }
        }
    })
    @ApiResponse({
        status: 400,
        schema: {
            properties: {
                statusCode: { type: 'integer', default: 400 },
                error: { type: 'string', default: "Bad Request" },
                message: {
                    type: 'array',
                    items: { type: 'string', description: 'error message' }
                },
            }
        }
    })
    @ApiResponse({
        status: 500,
        schema: {
            properties: {
                statusCode: { type: 'integer', default: 500 },
                error: { type: 'string', default: "Internal Server Error" },
            }
        }
    })
    //create customer
    @Post('Add-customer')
    async addCustomer(@Body() customerDto: CustomerDto) {
        try {
            console.log(customerDto)
            return await this.customerService.customerData(customerDto)

        } catch (err) {
            const a = {
                err: err.toString(),
                req: customerDto
            }
            this.logger.error(JSON.stringify(a, null, ' '))
            throw new InternalServerErrorException()
        }
    }


    @ApiResponse({
        status: 200,
        schema: {
            properties: {
                message: { type: 'string', default: 'Success' },
            }
        }
    })
    @ApiResponse({
        status: 400,
        schema: {
            properties: {
                statusCode: { type: 'integer', default: 400 },
                error: { type: 'string', default: "Bad Request" },
                message: {
                    type: 'array',
                    items: { type: 'string', description: 'error message' }
                },
            }
        }
    })
    @ApiResponse({
        status: 500,
        schema: {
            properties: {
                statusCode: { type: 'integer', default: 500 },
                error: { type: 'string', default: "Internal Server Error" },
            }
        }
    })

    //update customer
    @Put('update-customerData')
    UpdateCustomer(@Body() addCustomerDto: AddCustomerDto) {
        try {
            return this.customerService.CustomerUpdate(addCustomerDto.userId, addCustomerDto.name, addCustomerDto.email, addCustomerDto.email, addCustomerDto.address)
        } catch (err) {
            const a = {
                err: err.toString(),
                req: addCustomerDto
            }
            this.logger.error(JSON.stringify(a, null, ' '))
            throw new InternalServerErrorException()
        }
    }


    //delete customer
    @ApiResponse({
        status: 200,
        schema: {
            properties: {
                message: { type: 'string', default: 'Success' },
            }
        }
    })
    @ApiResponse({
        status: 401,
        schema: {
            properties: {
                statusCode: { type: 'number', description: 'status code of the request', default: 401 }
            }
        }
    })
    @ApiResponse({
        status: 404,
        schema: {
            properties: {
                statusCode: { type: 'number', description: 'status code of the request', default: 404 },
                message: { type: 'string', description: 'error message', default: '{id} not found.' },
                error: { type: 'string', description: 'error', default: 'Not Found' },
            }
        }
    })
    @ApiResponse({
        status: 500,
        schema: {
            properties: {
                statusCode: { type: 'integer', default: 500 },
                error: { type: 'string', default: "Internal Server Error" },
            }
        }
    })

    //customer Delete data
    @Delete('Delete-customerData')
    DeleteCustomer(@Query('userId') userId: string) {
        try {
            return this.customerService.CustomerDelete(userId)
        } catch (err) {
            const a = {
                err: err.toString(),
                req: userId
            }
            this.logger.error(JSON.stringify(a, null, ' '))
            throw new InternalServerErrorException()
        }
    }

    @ApiQuery({
        name: "name",
        type: String,
        description: "Enter user name",
        required: false
    })
    @Get('download-pdf')
    async download(@Query('name') id: string, @Res() res: Response) {
        return this.customerService.download(id, res)
    }
}




