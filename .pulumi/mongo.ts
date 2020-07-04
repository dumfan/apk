import * as k8s from '@pulumi/kubernetes';
import { provider } from './provider'

export const deployment = new k8s.apps.v1.Deployment('mongo', {
  spec: {
    selector: { matchLabels: { app: 'dumfan-apk-mongo' } },
    template: {
      metadata: {
        labels: { app: 'dumfan-apk-mongo' }
      },
      spec: {
        containers: [
          {
            name: 'db',
            image: 'mongo'
          }
        ]
      }
    }
  }
},
{ provider })

export const service = new k8s.core.v1.Service('mongo', {
  metadata: { labels: deployment.spec.template.metadata.labels },
  spec: {
      type: 'NodePort',
      ports: [{ port: 27017, targetPort: 27017, protocol: 'TCP' }],
      selector: deployment.spec.selector.matchLabels
  }
},{ provider });
