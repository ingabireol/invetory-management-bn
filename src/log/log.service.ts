import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Log } from "./entities/log.entity";

@Injectable()
export class LogService{
    constructor(
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,
      ) {}
      async createLog(eventType: string, productId: number, productName: string) {
        const log = this.logRepository.create({ eventType, productId, productName });
        return this.logRepository.save(log);
      }

}