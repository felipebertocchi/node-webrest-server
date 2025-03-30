export class UpdateTodoDto {
  private constructor(
    public readonly id?: number,
    public readonly text?: string,
    public readonly completedAt?: string
  ) { }

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

    const { id, text, completedAt } = props;
    const newCompletedAt = completedAt;

    if (!id || isNaN(id)) return ['ID property is required and must be a number', undefined];
    if (id < 1) return ['ID property must be greater than 0', undefined];

    if (!text) return ['text property is required', undefined];
    if (typeof text !== 'string') return ['text property must be a string', undefined];
    if (text.length < 1) return ['text property must be at least 1 character long', undefined];

    if (newCompletedAt && typeof newCompletedAt !== 'string') return ['completedAt property must be a string', undefined];
    if (newCompletedAt && isNaN(Date.parse(newCompletedAt))) return ['completedAt property must be a valid date', undefined];

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}