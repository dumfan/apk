import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

const env = pulumi.getStack();
const cluster = new pulumi.StackReference(`benjick/inf/${env}`);
const kubeconfig = cluster.getOutput("kubeconfig");

export const provider = new k8s.Provider('k8s-provider', { kubeconfig });

