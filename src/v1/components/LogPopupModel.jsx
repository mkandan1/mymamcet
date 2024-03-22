import React, { useEffect, useState } from 'react'
import { Model } from './Model'
import { Icon } from '@iconify/react'
import { Queries } from '../apis/queries/queries'
import { Button } from './Button'

export const LogPopupModel = ({ rows, cols, show, data, loading, handleRefresh, onClose }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (data && data.logs) {
      Queries.getLogs(data.logs)
        .then((result) => setLogs(result.logs))
        .catch((err) => console.error(err)); // Handle error properly here
    }
  }, [data])

  return (
    <Model title={'Changes log'} rows={rows} cols={cols} show={show} onClose={onClose}>
      <div className='absolute top-20 right-14 z-50'>
        <Button bgColor={'blue-500'} textColor={'white'} text={'Refresh'} id={'refresh'} icon={'ic:baseline-refresh'} isLoading={loading} onClick={handleRefresh} />
      </div>
      <div>
        {logs.length > 0 && logs.map((log) => (
          <div className='p-8 flex gap-10 relative' key={log._id}>
            <div>
              <span className='text-gray-500 text-sm font-manrope'>{log.timestamps}</span>
            </div>
            <div className='rounded-full flex gap-4'>
              <img src={log.user.photo} className='rounded-full w-10 h-10 border-2 border-green-500' />
              <div className='flex flex-col gap-4'>
                <div className='flex-col flex'>
                  <div>
                    <span className='text-base font-manrope tracking-normal text-gray-800'>{log.user.firstName} {log.user.lastName}</span>
                    <span className='text-sm text-yellow-600'> ({log.user.jobTitle ? log.user.jobTitle : "null"})</span>
                  </div>
                  <span className='text-gray-500 font-sen text-sm'>{log.message == 1 ? `made changes to this ${log.collectionName}` : `created this ${log.collectionName}`}</span>
                </div>
                {log.changes && log.changes.map((change) => (
                  <div className='flex gap-4 items-center' key={change.field}>
                    <div className='flex flex-col'>
                      <span className='text-blue-700 text-sm'>{change.field}</span>
                      <span>{change.oldValue}</span>
                    </div>
                    <Icon icon={'uiw:arrow-up'} className='rotate-90 text-sm text-gray-400' />
                    <div className='flex flex-col'>
                      <span className='text-blue-700 text-sm'>{change.field}</span>
                      <span>{change.newValue}</span>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        ))}
      </div>
    </Model>
  )
}
