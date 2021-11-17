/*
 * Copyright (c) 2018-2021 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

import getRandomString from './random';
import { updateDevfile } from '../storageTypes';
import { Devfile } from '../workspace-adapter';
import devfileApi from '../devfileApi';

export function getDefaultDevfileV1(
  preferredStorageType: che.WorkspaceStorageType,
  generateName = 'wksp-',
): che.WorkspaceDevfile {
  const devfile = {
    apiVersion: '1.0.0',
    metadata: {
      generateName,
    },
  };

  return updateDevfile(devfile as Devfile, preferredStorageType) as che.WorkspaceDevfile;
}

export function getDefaultDevfileV2(generateName = 'wksp-'): devfileApi.Devfile {
  return {
    schemaVersion: '2.1.0',
    metadata: {
      name: generateName + getRandomString(4).toLowerCase(),
    },
  } as devfileApi.Devfile;
}

export default function getDefaultDevfile(
  isDevworkspacesEnabled: boolean,
  preferredStorageType: che.WorkspaceStorageType,
  generateName = 'wksp-',
): Devfile {
  if (isDevworkspacesEnabled) {
    return getDefaultDevfileV2(generateName);
  } else {
    return getDefaultDevfileV1(preferredStorageType, generateName);
  }
}
