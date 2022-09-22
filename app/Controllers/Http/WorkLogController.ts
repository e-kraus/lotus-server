import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkLog from '../../Models/WorkLog'
// import User from 'App/Models/User'

export default class WorkLogController {
  public async index({ response }: HttpContextContract) {
    try {
      const worklog = await WorkLog.query().select('*').from('work_logs')
      // .query()
      // .preload('user')
      // .whereHas('user', (query) => {
      //   query.where('firstName', 'Sasha')
      // })
      return response.json({
        success: true,
        message: 'WorkLogs retrieved successfully',
        data: worklog,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // get single user's worklog
  public async userWorkLog({ response, params }: HttpContextContract) {
    try {
      // const user = await User.find(params.id)
      const workLogs = await WorkLog.query()
        .select('*')
        .preload('user')
        .from('work_logs')
        // .where('user_id', params.id)
        .whereHas('user', (query) => {
          query.where('user_id', params.id)
        })
      return response.json({
        success: true,
        message: 'Single User WorkLogs retrieved successfully',
        data: workLogs,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const worklog = await WorkLog.find(params.id)
      if (worklog) {
        return response.json({
          success: true,
          message: 'WorkLog found',
          data: worklog,
        })
      } else {
        return response.json({
          success: true,
          message: 'WorkLog not found',
          data: null,
        })
      }
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.all()
      const worklog = await WorkLog.create(data)
      return response.json({
        success: true,
        message: 'WorkLog created successfully',
        data: worklog,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const worklog = await WorkLog.findOrFail(params.id)
      if (!worklog) {
        return response.json({
          success: true,
          message: 'WorkLog not found',
          data: null,
        })
      } else {
        worklog.merge(request.all())
        await worklog.save()
        return response.json({
          success: true,
          message: 'WorkLog updated successfully',
          data: worklog,
        })
      }
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const worklog = await WorkLog.find(params.id)
      if (worklog) {
        worklog.delete()
        return response.json({
          success: true,
          message: 'Successfully deleted the worklog',
          data: null,
        })
      } else {
        return response.json({
          success: false,
          message: 'WorkLog does not exist',
          data: worklog,
        })
      }
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
