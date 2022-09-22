import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceRequests extends BaseSchema {
  protected tableName = 'service_requests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description')
      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE')
      table.string('user_email')
      table.date('date')
      table.boolean('completed')
      table
        .enum('category', ['Software Update', 'Service Request', 'Maintenance'])
        .defaultTo('Maintenance')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
