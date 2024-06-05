import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length, IsOptional } from 'class-validator';

class AddCustomerDto {

    @ApiProperty()
    @IsOptional()
    userId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty({ message: 'Email is required.' })
    email: string;

    @ApiProperty()
    @IsString({ message: 'Mobile number must be a string' })
    @IsNotEmpty({ message: 'Mobile number is required.' })
    @Length(10, 10, { message: 'Mobile number to be equal to 10 digits.' })
    mobile_number: string;



    @ApiProperty()
    address: string;

}

class CustomerDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty({ message: 'Email is required.' })
    email: string;

    @ApiProperty()
    @IsString({ message: 'Mobile number must be a string' })
    @IsNotEmpty({ message: 'Mobile number is required.' })
    @Length(10, 10, { message: 'Mobile number to be equal to 10 digits.' })
    mobile_number: string;



    @ApiProperty()
    address: string;

}


export { AddCustomerDto, CustomerDto }

