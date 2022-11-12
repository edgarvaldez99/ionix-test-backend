import { DeepPartial, DeleteResult, FindOneOptions } from 'typeorm';

/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class RepositoryMock<T> {
  protected abstract entityStub: T;

  get isActived(): boolean {
    return (this.entityStub as any).isActived;
  }

  constructor(createDto: T) {
    this.constructorSpy(createDto);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructorSpy(_createDto: T): void {}

  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async findOneBy({ id }: { id: number }): Promise<T | null> {
    if (id < 1) return null;
    return this.entityStub;
  }

  async findOne(opts: FindOneOptions<T>): Promise<T | null> {
    if ((opts.where as any).username === 'null') return null;
    return this.entityStub;
  }

  create(_: DeepPartial<T>): T {
    return this.entityStub;
  }

  merge(_: T, ...__: DeepPartial<T>[]): T {
    return this.entityStub;
  }

  async delete(_: number): Promise<DeleteResult> {
    return { raw: this.entityStub };
  }

  async save<E extends DeepPartial<T>>(_: E): Promise<T> {
    return this.entityStub;
  }
}
