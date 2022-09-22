import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class WorkLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: Date

  @column()
  public day: string

  @column()
  public userId: number

  @column()
  public description: string

  @column()
  public hours: number

  @column()
  public approval: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
