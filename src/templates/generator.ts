export default interface Generator {
  generate(
    table: { tableName: string; tableComment: string },
    info: { columns: any[]; foreignKeys: any[]; references: any[] },
    path: string,
  ): Promise<void>;
}
