export class CreateTodoDto {
  private constructor(
    public readonly text: string
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {

    const { text } = props;
    if (!text) return ['Text property is required', undefined];
    if (typeof text !== 'string') return ['Text property must be a string', undefined];
    if (text.length < 1) return ['Text property must be at least 1 character long', undefined];

    return [undefined, new CreateTodoDto(text)];
  }
}