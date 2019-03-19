// app/cluster.js

// Import dependencies.
import cluster from 'cluster'
import os from 'os'

// Master process.
if (cluster.isMaster) {
  // Calculate cpu's count.
  const cpuCount = os.cpus().length

  // Create child processes.
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  // On disconnect create new fork and write to logs.
  cluster.on('disconnect', (worker) => {
    log.warn(`Worker ${worker.id} was disconnected from appllication`)
    cluster.fork()
  })

  // Write to logs on connected worker.
  cluster.on('listening', (worker, address) => {
    log.info(`Worker ${worker.id} is now connected to ${address.address}:${address.port} PID: ${worker.process.pid}`)
  })
} else {
  // Create server in child process.
  require('./server')
}
