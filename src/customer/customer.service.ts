import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
const PDFDocument = require("pdfkit-table");
import { Response } from 'express';
import { CustomerDto } from './customer.dto';


@Injectable()
export class CustomerService {
  private readonly logger = new Logger(this.constructor.name)

  constructor(readonly prismaService: PrismaService) { }


  //get all data
  async cutomerGetData(id: string) {
    return await this.prismaService.customer.findMany({
      where: {
        name: {
          startsWith: id,
          mode: 'insensitive',
        }
      }
    })
  }

  //create customer
  async customerData(custDto: CustomerDto) {

    const userId = uuidv4();
    const data = await this.prismaService.customer.create({
      data: {
        user_id: userId,
        name: custDto.name,
        email: custDto.email,
        mobile_number: custDto.mobile_number,
        address: custDto.address
      }
    })
    this.logger.log(data)
    return data
  }

  //update customer
  async CustomerUpdate(userId: string, name: string, email: string, mobile_number: string, address: string) {
    const customer = await this.prismaService.customer.findFirstOrThrow({
      where: {
        user_id: userId
      }
    })
    if (customer) {
      await this.prismaService.customer.update({
        where: {
          user_id: userId
        },
        data: {
          name: name,
          email: email,
          mobile_number: mobile_number,
          address: address
        },
      })
    }
  }

  //delete customer
  async CustomerDelete(userId: string) {
    const customer = await this.prismaService.customer.findFirstOrThrow({
      where: {
        user_id: userId
      }
    })

    if (customer) {
      await this.prismaService.customer.delete({
        where: {
          user_id: userId
        }
      })
    }
  }



  async download(id: any, res: Response) {

    let userData = await this.prismaService.customer.findMany({
      where: {
        name: {
          startsWith: id,
          mode: 'insensitive',
        }
      },
      select: {
        name: true,
        user_id: true,
        email: true,
        mobile_number: true,
        address: true,
      }
    })

    let doc = new PDFDocument({ margin: 30, size: 'A4' });
    doc.pipe(fs.createWriteStream("./document.pdf"));

    (async function () {
      const tableJson = {
        "headers": [
          { "label": "user_id", "property": "user_id", "width": 100 },
          { "label": "name", "property": "name", "width": 100 },
          { "label": "email", "property": "email", "width": 100 },
          { "label": "mobile_number", "property": "mobile_number", "width": 100 },
          { "label": "address", "property": "address", "width": 100 }
        ],
        "datas": userData,
        "options": {
          "width": 300
        }
      };

      doc.table(tableJson);
      doc.end();
    })();

    setTimeout(function () {
      let pdfPath = 'document.pdf';
      if (fs.existsSync(pdfPath)) {
        res.download(pdfPath);
      }
      else {
        res.status(404).send('PDF not found');
      }
    }, 1000);

  }
}